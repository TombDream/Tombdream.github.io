# 把所有工作表合并为一个工作表

 

    Sub MergeSheets()
    Dim ws As Worksheet
    Dim newWs As Worksheet
    Dim lastRow As Long
    Dim i As Long, j As Long
    Set newWs = Worksheets.Add(After:=Worksheets(Worksheets.Count)) '新建一个工作表放在最后面
    newWs.Name = "合并结果" '可以根据需求修改新工作表名称
    i = 1
    For Each ws In Worksheets
        If ws.Name <> newWs.Name Then '跳过新建的用来合并结果的工作表本身
            ws.Activate
            lastRow = Cells(Rows.Count, 1).End(xlUp).Row '获取当前工作表A列最后一个有数据的行号
            For j = 1 To lastRow
                newWs.Cells(j, i).Value = ws.Cells(j, 1).Value '将数据逐行复制到新工作表对应列，这里先简单以第一列为例，可按需调整
            Next j
            newWs.Cells(1, i).Value = ws.Name '将工作表名称作为新工作表对应列的首行标题
            i = i + 1
        End If
    Next ws
    End Sub



# 统计订单表格并生成数据透视表

    Sub MergeData()
    Dim lastRow As Long
    Dim i As Long
    Dim ws As Worksheet
    Dim a, b, d, n() '定义相关变量

    Set ws = ThisWorkbook.Worksheets("Sheet1") '指定操作的工作表，可按需修改名称

    '第一步：将E、F、G列合并到H列
    lastRow = ws.Cells(ws.Rows.Count, "A").End(xlUp).Row '获取A列最后一个有数据的行号
    For i = 1 To lastRow '从第1行开始遍历数据（跳过表头）
        ws.Cells(i, "H").Value = ws.Cells(i, "E").Value & ws.Cells(i, "F").Value & ws.Cells(i, "G").Value
    Next i

    '第二步：基于A列对H列数据按相同值合并整理，并输出到K列和L列
    Set d = CreateObject("Scripting.Dictionary")
    lastRow = ws.Cells(ws.Rows.Count, "A").End(xlUp).Row '再次获取A列最后有数据的行号（确保后续循环范围准确）
    For i = 1 To lastRow
        If d.exists(ws.Range("a" & i).Value) = False Then
            d.Add ws.Range("a" & i).Value, ws.Range("h" & i).Value
        Else
            d.Item(ws.Range("a" & i).Value) = d.Item(ws.Range("a" & i).Value) & "," & ws.Range("h" & i).Value
        End If
    Next i

    n = d.keys
    For b = 1 To d.Count
        ws.Range("I" & b).Value = n(b - 1)
        ws.Range("J" & b).Value = d.Item(n(b - 1))
    Next b


    '判断i列是否为空，不为空填1

    For i = 1 To lastRow '从第1行开始遍历，可根据实际表头情况调整起始行
        If ws.Cells(i, "J").Value <> "" Then '判断i列单元格是否有数值（这里简单判断不为空，你可以根据具体需求调整判断条件，比如判断是否为数值类型等）
            ws.Cells(i, "K").Value = 1
        End If
    Next i

    '判断i列是否为空，不为空填1

    '数据透视表开始
    Dim PvtCache As PivotCache
    Dim PvtTbl As PivotTable
    Dim wsData As Worksheet
    Dim lastCol As Long

    '设置数据所在工作表
    Set wsData = ThisWorkbook.Worksheets("Sheet1")

    '获取J列（或K列，因为这里假设两列数据行数相同）最后一个有数据的行号
    lastRow = wsData.Cells(wsData.Rows.Count, "J").End(xlUp).Row

    '创建数据透视表缓存，只关联J列和K列的数据范围
    Set PvtCache = ThisWorkbook.PivotCaches.Create(SourceType:=xlDatabase, SourceData:=wsData.Range("J1:K" & lastRow))

    '创建数据透视表，放置在原工作表的某个位置（此处为F1，可修改）
    Set PvtTbl = PvtCache.CreatePivotTable(TableDestination:=wsData.Range("L1"), TableName:="PivotTableJK")

    '将J列字段添加到数据透视表的行区域（可调整布局）
    PvtTbl.PivotFields(wsData.Cells(1, "J").Value).Orientation = xlRowField

    '数据透视表结束
    End Sub






