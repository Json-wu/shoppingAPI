import  assert  from 'assert';
import { importData } from '../service/product';
import { expect } from 'chai'

describe('测试product.ts',()=>{
    before(() => console.info("在本区块的所有测试用例之前执行"))
 
    after(() => console.info("在本区块的所有测试用例之后执行"))
 
    beforeEach(() => console.info("在本区块的每个测试用例之前执行"))
 
    afterEach(() => console.info("在本区块的每个测试用例之后执行"))
 
    describe('测试importData函数', () => {
        it('导入excel商品清单文件成功', (done) => {
            (async function(){
                try {
                    let req = {files:[{path:process.cwd()+'/files/jewelery.xlsx',originalname:'jewelery.xlsx'}]};
                    let r = await importData(req);
                    expect(r.code).to.be.equal(0);
                    // assert.strictEqual(r.code, 0,'导入excel商品清单文件成功');
                    done();
                } catch (err) {
                    done(err);
                }
            })();
        })
        // it('导入excel商品清单文件成功', (done) => {
        //     (async function(){
        //         try {
        //             let req = {files:[{path:process.cwd()+'/files/jewelery.xls',originalname:'jewelery.xls'}]};
        //             let r = await importData(req);
        //             expect(r.code).to.be.equal(0);
        //             // assert.strictEqual(r.code, 0,'导入excel商品清单文件成功');
        //             done();
        //         } catch (err) {
        //             done(err);
        //         }
        //     })();
        // })
        it('导入word商品清单文件失败', (done) => {
            (async function(){
                try {
                    let req = {files:[{path:process.cwd()+'/files/jewelery.docx',originalname:'jewelery.docx'}]};
                    let r = await importData(req);
                    expect(r.code).to.be.equal(1);
                    // assert.strictEqual(r.code, 0,'导入excel商品清单文件成功');
                    done();
                } catch (err) {
                    done(err);
                }
            })();
        })
        it('导入pdf商品清单文件失败', (done) => {
            (async function(){
                try {
                    let req = {files:[{path:process.cwd()+'/files/jewelery.pdf',originalname:'jewelery.pdf'}]};
                    let r = await importData(req);
                    expect(r.code).to.be.equal(1);
                    // assert.strictEqual(r.code, 0,'导入excel商品清单文件成功');
                    done();
                } catch (err) {
                    done(err);
                }
            })();
        })
        it('导入excel非商品清单文件失败', (done) => {
            (async function(){
                try {
                    let req = {files:[{path:process.cwd()+'/files/jewelery2.xlsx',originalname:'jewelery2.xlsx'}]};
                    let r = await importData(req);
                    expect(r.code).to.be.equal(1);
                    // assert.strictEqual(r.code, 0,'导入excel商品清单文件成功');
                    done();
                } catch (err) {
                    done(err);
                }
            })();
        })
    })
})