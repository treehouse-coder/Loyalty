const APP = {

    notificationTimer: null,


    init() {

        this.bindMenu();

        this.createNotification();

        /*
        ==================================
        HALAMAN PERTAMA
        ==================================
        */

        this.openPage(
            "stamp"
        );

    },


    /*
    ==================================
    CREATE NOTIFICATION
    ==================================
    */

    createNotification() {

        let notification =
            document.getElementById(
                "app-notification"
            );


        if (notification) {

            return;

        }


        notification =
            document.createElement(
                "div"
            );


        notification.id =
            "app-notification";


        notification.className =
            "app-notification";


        notification.style.display =
            "none";


        document.body.appendChild(
            notification
        );

    },


    /*
    ==================================
    SHOW NOTIFICATION
    ==================================
    */

    showNotification(
        text,
        type = "success"
    ) {

        let notification =
            document.getElementById(
                "app-notification"
            );


        if (!notification) {

            this.createNotification();


            notification =
                document.getElementById(
                    "app-notification"
                );

        }


        if (!notification) {

            return;

        }


        clearTimeout(
            this.notificationTimer
        );


        notification.textContent =
            text;


        notification.className =
            "app-notification " +
            type;


        notification.style.display =
            "block";


        this.notificationTimer =
            setTimeout(
                () => {

                    this.hideNotification();

                },
                2500
            );

    },


    /*
    ==================================
    HIDE NOTIFICATION
    ==================================
    */

    hideNotification() {

        const notification =
            document.getElementById(
                "app-notification"
            );


        if (!notification) {

            return;

        }


        clearTimeout(
            this.notificationTimer
        );


        notification.textContent =
            "";


        notification.style.display =
            "none";


        notification.className =
            "app-notification";

    },


    /*
    ==================================
    BIND MENU
    ==================================
    */

    bindMenu() {

        const buttons =
            document.querySelectorAll(
                ".menu-button"
            );


        buttons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const page =
                        button.dataset.page;


                    this.openPage(
                        page
                    );

                }
            );

        });

    },


    /*
    ==================================
    OPEN PAGE
    ==================================
    */

    openPage(page) {

        this.hideNotification();


        /*
        ==================================
        ACTIVE MENU
        ==================================
        */

        const buttons =
            document.querySelectorAll(
                ".menu-button"
            );


        buttons.forEach(
            button => {

                button.classList.remove(
                    "active"
                );


                if (
                    button.dataset.page ===
                    page
                ) {

                    button.classList.add(
                        "active"
                    );

                }

            }
        );


        /*
        ==================================
        STAMP
        ==================================
        */

        if (
            page === "stamp"
        ) {

            StampForm.render();

            return;

        }


        /*
        ==================================
        ADD MEMBER
        ==================================
        */

        if (
            page === "member"
        ) {

            AddMemberForm.render();

            return;

        }


        /*
        ==================================
        USED
        ==================================
        */

        if (
            page === "used"
        ) {

            UsedForm.render();

            return;

        }

    }

};


document.addEventListener(
    "DOMContentLoaded",
    () => {

        APP.init();

    }
);