import User from '../model/User';
import Controller from '../controller/Controller';

describe('Authentication tests', () => {

    let controller = Controller.getInstance();

    it('test signup', () => {
        let user = new User();
        user.email = "mohamed.adel647@gmail.com";
        user.password = "123456";
        controller.signUp(user).then(function (status) {
            if (typeof status === "string") {
                expect(status).toBe("The email address is already in use by another account.")
            }
            else {
                expect(status).toBe(true);
            }
        });
    });

    it('test login', () => {
        let user = new User();
        user.email = "mohamed.adel647@gmail.com";
        user.password = "123456";
        controller.signIn(user).then(function (status) {
            expect(status).toBe(true);
        });
    });

    it('test signup with invalid email', () => {
        let user = new User();
        user.email = "user";
        user.password = "123456";
        controller.signUp(user).then(function (status) {
            expect(status).toBe("The email address is badly formatted.");
        });
    });

    it('test login with unregistered email', () => {
        let user = new User();
        user.email = "noUser@example.com";
        user.password = "123456";
        controller.signIn(user).then(function (status) {
            expect(status).toBe("There is no user record corresponding to this identifier. The user may have been deleted.");
        });
    });

    it('test signout', () => {
        let user = new User();
        user.email = "mohamed.adel647@gmail.com";
        user.password = "123456";
        controller.signIn(user).then(function (status) {
            expect(status).toBe(true);
        });
        controller.signOut().then(function (status) {
            expect(status).toBe(true);
        });
        expect(controller.getCurrentSignedUser()).toBe(null);
    });

});