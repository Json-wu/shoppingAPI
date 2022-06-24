
import * as path from "path";
import * as _ from "underscore";
import * as Shopify from "shopify-api-node";
import { xlsxToJson } from '../middleware/xlsx';
import { Product } from '../model/product';
import e = require("express");

async function importData(req: any) {
    try {
        // const ROOT_PATH = process.cwd();
        // let filepath = ROOT_PATH + '/files/jewelery.xlsx';
        // req = {files:[{path:process.cwd()+'/files/jewelery2.xlsx',originalname:'jewelery2.xlsx'}]}
        const file = req.files[0];
        let filepath = file.path;
        let ext = path.parse(file.originalname).ext;
        if (ext != '.xlsx' && ext != '.xls') {
            return {
                code: 1,
                msg: "导入失败,请正确选择文件"
            };
        }
        let formatData = await xlsxToJson(filepath);
        if (formatData.code) {
            formatData.msg = '导入失败-' + formatData.msg;
            return formatData;
        } else {
            await add(formatData.items);
            return {
                code: 0,
                msg: "导入成功"
            }
        }
    } catch (error) {
        // console.log(`---importData---error:`,error);
        return {
            code: 1,
            msg: "导入失败"
        }
    }
}

async function add(list: Array<any>) {
    if(list.length<0 || !list[0]["Handle"]|| !list[0]["Title"]|| !list[0]["Body (HTML)"]|| !list[0]["Variant Price"]|| !list[0]["Image Src"]){
        throw new Error('请导入正确文件');
    }
    let new_list = _.groupBy(list, (item) => {
        return item["Handle"];
    })
    for (const key in new_list) {
        const item = new_list[key];
        let product: Product = {
            images:[],
            options:[],
            variants:[],
        };
        let option1_name = "", option2_name = "", option3_name = ""
        _.map(item, (pro) => {
            product.title = pro["Title"] || product.title;
            product.body_html = pro["Body (HTML)"] || product.body_html;
            product.product_type = pro["Type"] || product.product_type;
            product.vendor = pro["Vendor"] || product.vendor;
            product.tags = pro["Tags"] || product.tags;
            if (pro["Image Src"]) {
                product.images.push({ 'src': pro["Image Src"] });
            }
            if (pro["Variant Price"]) {
                if (product.variants && product.variants.length == 0) {
                    product.variants.push({ 'price': pro["Variant Price"] });
                }
            }
            if (pro["Option1 Value"] && (!!option1_name || pro["Option1 Name"])) {
                option1_name = pro["Option1 Name"] || option1_name;
                let ops = _.find((product.options || []), (op) => {
                    return op.name == option1_name;
                })
                if (ops) {
                    ops.values.push(pro["Option1 Value"]);
                } else {
                    product.options.push({
                        name: option1_name,
                        values: [pro["Option1 Value"]]
                    });
                }
            }
            if (pro["Option2 Value"] && (!!option2_name || pro["Option2 Name"])) {
                option2_name = pro["Option2 Name"] || option2_name;
                let ops = _.find((product.options || []), (op) => {
                    return op.name == option2_name;
                })
                if (ops) {
                    ops.values.push(pro["Option2 Value"]);
                } else {
                    product.options.push({
                        name: option2_name,
                        values: [pro["Option2 Value"]]
                    });
                }
            }
            if (pro["Option3 Value"] && (!!option3_name || pro["Option3 Name"])) {
                option3_name = pro["Option3 Name"] || option3_name;
                let ops = _.find((product.options || []), (op) => {
                    return op.name == option3_name;
                })
                if (ops) {
                    ops.values.push(pro["Option3 Value"]);
                } else {
                    product.options.push({
                        name: option3_name,
                        values: [pro["Option3 Value"]]
                    });
                }
            }
        })
        await product_add(product);
    }
}
let shopify = new Shopify({
    shopName: "shopyinhao.myshopify.com",
    accessToken: "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"
});
async function product_add(product: any) {
    // console.log(product);
    // let pro1 = await 
    shopify.product.create(product);
    // console.log(pro1);
}

export { importData };