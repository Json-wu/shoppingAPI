import * as Excel from "exceljs";

async function xlsxToJson(filepath: any) {
    try {
        var workbook = new Excel.Workbook();

        let list: Array<any> = [];
        workbook = await workbook.xlsx.readFile(filepath);
        var worksheet = workbook.getWorksheet("jewelery"); //获取指定worksheet
        let colnames: Array<any> = [];
        worksheet.eachRow(function (row, rowNumber) {
            var rowSize = row.cellCount;
            var numValues = row.actualCellCount;
            if (rowNumber == 1) {
                row.eachCell(function (cell, colNumber) {
                    colnames.push(cell.text);
                })
            } else {
                let colObj: any = {};
                // cell.type单元格类型：6-公式 ;2-数值；3-字符串
                row.eachCell(function (cell, colNumber) {
                    let val;
                    if (cell.type == 6) {
                        val = cell.result;
                    } else {
                        val = cell.text;
                    }
                    colObj[colnames[colNumber - 1]] = val;
                    // console.log("Cell " + colNumber + " = " + cell.type + " " + val);
                });

                list.push(colObj);
            }
        });

        return {
            code: 0,
            items: list,
            msg: "解析成功"
        }
    } catch (error) {
        console.log(`---xlsxToJson---error:`,error);
        return {
            code: 1,
            msg: "解析失败"
        }
    }
}

export { xlsxToJson };