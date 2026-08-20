const StampForm = {

    render() {

        const content =
            document.getElementById(
                "content"
            );


        content.innerHTML = `

            <div class="page-header">

                <h2>
                    Add stamp to member
                </h2>


            </div>


            <div
                id="member-info-container"
            ></div>


            <div
                id="form-container"
            ></div>

        `;


        MemberInfoCard.render();
        API.clearMemberInfo();

        this.renderForm();

    },


    renderForm() {

        const container =
            document.getElementById(
                "form-container"
            );


        container.innerHTML = `

            <form
                id="stamp-form"
                class="form"
            >

                <div class="form-group">

                    <label for="stamp-kode">
                        Kode
                    </label>

                    <input
                        type="text"
                        id="stamp-kode"
                        placeholder="Masukkan nomor"
                        maxlength="4"
                        inputmode="numeric"
                        autocomplete="off"
                        required
                    >

                </div>


                <div class="form-group">

                    <label for="stamp-payment">
                        Payment
                    </label>

                    <input
                        type="number"
                        id="stamp-payment"
                        min="0"
                        step="1"
                        inputmode="numeric"
                        autocomplete="off"
                        required
                    >

                </div>


                <button
                    type="submit"
                    id="stamp-submit"
                    class="primary-button"
                >
                    STAMP
                </button>


                <div
                    id="stamp-message"
                    class="form-message"
                ></div>

            </form>

        `;


        this.bind();

    },


    bind() {

        const form =
            document.getElementById(
                "stamp-form"
            );


        const kodeInput =
            document.getElementById(
                "stamp-kode"
            );


        if (!form || !kodeInput) {

            return;

        }


        /*
        ==================================
        INPUT KODE
        ==================================
        */

        kodeInput.addEventListener(
            "input",
            () => {

                let value =
                    kodeInput.value
                        .replace(/\D/g, "");


                if (
                    value.length > 4
                ) {

                    value =
                        value.substring(
                            0,
                            4
                        );

                }


                kodeInput.value =
                    value;


                MemberInfoCard.clear();


                if (!value) {

                    return;

                }


                const kode =
                    "TM-" +
                    value.padStart(
                        4,
                        "0"
                    );


                MemberInfoCard.load(
                    kode
                );

            }
        );


        /*
        ==================================
        INFO BUTTON
        ==================================
        */

        const infoButton =
            document.getElementById(
                "stamp-info-button"
            );


        if (infoButton) {

            infoButton.addEventListener(
                "click",
                () => {

                    const kode =
                        MemberInfoCard.getKode();


                    if (!kode) {

                        return;

                    }


                    if (
                        typeof MemberInfoModal !==
                        "undefined"
                    ) {

                        MemberInfoModal.open(
                            kode
                        );

                    }

                }
            );

        }


        /*
        ==================================
        SUBMIT
        ==================================
        */

        form.addEventListener(
            "submit",
            async event => {

                event.preventDefault();

                await this.submit();

            }
        );

    },


    async submit() {

        const kodeInput =
            document.getElementById(
                "stamp-kode"
            );


        const paymentInput =
            document.getElementById(
                "stamp-payment"
            );


        const button =
            document.getElementById(
                "stamp-submit"
            );


        const message =
            document.getElementById(
                "stamp-message"
            );


        const rawKode =
            kodeInput.value.trim();


        const payment =
            paymentInput.value.trim();


                /*
        ==================================
        VALIDASI KODE
        ==================================
        */

        if (
            !/^\d{1,4}$/.test(
                rawKode
            )
        ) {

            APP.showNotification(
                "Kode harus berupa 1 sampai 4 angka.",
                "error"
            );


            kodeInput.focus();

            return;

        }


        /*
        ==================================
        FORMAT KODE
        ==================================
        */

        const kode =
            "TM-" +
            rawKode.padStart(
                4,
                "0"
            );


        /*
        ==================================
        VALIDASI PAYMENT
        ==================================
        */

        if (!payment) {

            APP.showNotification(
                "Payment wajib diisi.",
                "error"
            );


            paymentInput.focus();

            return;

        }


        /*
        ==================================
        LOADING
        ==================================
        */

        button.disabled = true;

        button.textContent =
            "SENDING...";


        /*
        ==================================
        API
        ==================================
        */

        const result =
            await API.stamp({

                Kode: kode,

                Payment: payment

            });


        /*
        ==================================
        STOP LOADING
        ==================================
        */

        button.disabled = false;

        button.textContent =
            "STAMP";


        /*
        ==================================
        CONNECTION ERROR
        ==================================
        */

        if (
            !result.success
        ) {

            APP.showNotification(
                "Connection error: " +
                result.error,
                "error"
            );

            return;

        }


        /*
        ==================================
        KODE TIDAK DITEMUKAN
        ==================================
        */

        if (
            result.data ===
            "KODE NOT FOUND"
        ) {

            APP.showNotification(
                "Kode tidak ditemukan.",
                "error"
            );


            kodeInput.focus();


            return;

        }


        /*
        ==================================
        PAYMENT REQUIRED
        ==================================
        */

        if (
            result.data ===
            "PAYMENT REQUIRED"
        ) {

            APP.showNotification(
                "Payment wajib diisi.",
                "error"
            );


            paymentInput.focus();


            return;

        }


        /*
        ==================================
        SUCCESS
        ==================================
        */

        if (
            result.data ===
            "STAMP SUCCESS"
        ) {

            APP.showNotification(
                "STAMP SUCCESS",
                "success"
            );


            /*
            ==================================
            CLEAR PAYMENT SAJA
            ==================================
            */

            paymentInput.value =
                "";


            /*
            ==================================
            REFRESH INFO CARD
            ==================================
            */

            await MemberInfoCard.load(
                kode
            );


            paymentInput.focus();


            return;

        }


        /*
        ==================================
        UNKNOWN RESPONSE
        ==================================
        */

        APP.showNotification(
            result.data ||
            "Unknown response.",
            "error"
        );

    }

};