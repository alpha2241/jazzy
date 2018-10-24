const chai = require('chai');
const rewire = require('rewire');
const sinon = require('sinon');
const expect = chai.expect;
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const demo = rewire('../lib/demo');

describe("demo",()=>{

    context("demo",()=>{

        it('testing add function',()=>{
            expect(demo.add(1,2)).to.equal(3);
        });

        it('testing callback',(done)=>{
            demo.addCallback(1,2,(err,res)=>{
                expect(err).to.not.exist;
                expect(res).to.equal(3);
                done();
            })
        })
        it('testing promise',()=>{
            return    demo.addPromise(1,2).then((res)=>
               { expect(res).to.equal(3)
               }
            ).catch(e=>{
                expect(e).to.be.not.exist;
            })
        })

        it('testing with stub',async ()=>{
            let creatFileStub = sinon.stub(demo,'createFile').resolves('create_stub');

            let callDBstub = sinon.stub().resolves('call_db');

            demo.__set__('callDB',callDBstub);


            let result = await demo.bar('text to');
            
            expect(result).to.equal('call_db');
        })

    })

})