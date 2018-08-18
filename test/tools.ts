import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import * as SinonLib from "sinon";
import {SinonStub} from "sinon";
import * as SinonChai from "sinon-chai";

Chai.should();
Chai.use(SinonChai);
Chai.use(ChaiAsPromised);

const expect = Chai.expect;
const assert = Chai.assert;
// tslint:disable-next-line
const Sinon = SinonLib;
const stub = (t: any): SinonStub => t;
const restore = (t: any) => t.restore();

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  // application specific logging, throwing an error, or other logic here
});

export {expect, assert, Sinon, SinonChai, stub, restore};
