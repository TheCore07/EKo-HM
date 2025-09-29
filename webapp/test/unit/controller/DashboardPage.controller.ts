/*global QUnit*/
import Controller from "eko_hm/ekohm/controller/Dashboard.controller";

QUnit.module("Dashboard Controller");

QUnit.test("I should test the Dashboard controller", function (assert: Assert) {
	const oAppController = new Controller("Dashboard");
	oAppController.onInit();
	assert.ok(oAppController);
});