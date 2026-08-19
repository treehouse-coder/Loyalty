const AddMemberForm = {

    render() {

        const content =
            document.getElementById(
                "content"
            );


        content.innerHTML = `

            <div class="page-header">

                <h2>
                    Add Member
                </h2>

                <p>
                    Register new member
                </p>

            </div>


            <div
                id="member-info-container"
            ></div>


            <div
                id="form-container"
            ></div>

        `;


        MemberInfoCard.render();


        this.renderForm();

    },


    renderForm() {

        const container =
            document.getElementById(
                "form-container"
            );


        container.innerHTML = `

            <form
                id="add-member-form"
                class="form"
            >

                <div class="form-group">

                    <label for="member-kode">
                        Kode
                    </label>


                    <div class="code-generator">

                        <input
                            type="text"
                            id="member-kode"
                            placeholder="Generating..."
                            readonly
                            autocomplete="off"
                            required
                        >


                        <button
                            type="button"
                            id="generate-kode-button"
                            class="info-button"
                        >
                            GENERATE
                        </button>

                    </div>

                </div>


                <div class="form-group">

                    <label for="member-nama">
                        Guest Name
                    </label>


                    <input
                        type="text"
                        id="member-nama"
                        placeholder="Guest Name"
                        autocomplete="off"
                        required
                    >

                </div>


                <div class="form-group">

                    <label for="member-payment">
                        Payment
                    </label>


                    <input
                        type="number"
                        id="member-payment"
                        min="0"
                        step="1"
                        inputmode="numeric"
                        autocomplete="off"
                        required
                    >

                </div>


                <button
                    type="submit"
                    id="member-submit"
                    class="primary-button"
                >
                    ADD MEMBER
                </button>


                <div
                    id="member-message"
                    class="form-message"
                ></div>

            </form>

        `;


        this.bind();


        /*
        ==================================
        GENERATE KODE AWAL
        ==================================
        */

        this.loadNextKode();

    },


    bind() {

        const form =
            document.getElementById(
                "add-member-form"
            );


        const generateButton =
            document.getElementById(
                "generate-kode-button"
            );


        /*
        ==================================
        GENERATE BUTTON
        ==================================
        */

        if (generateButton) {

            generateButton.addEventListener(
                "click",
                async () => {

                    await this.loadNextKode();

                }
            );

        }


        /*
        ==================================
        SUBMIT
        ==================================
        */

        if (form) {

            form.addEventListener(
                "submit",
                async event => {

                    event.preventDefault();


                    await this.submit();

                }
            );

        }

    },


    async loadNextKode() {

        const input =
            document.getElementById(
                "member-kode"
            );


        const button =
            document.getElementById(
                "generate-kode-button"
            );


        if (!input) {

            return;

        }


        input.value =
            "Generating...";


        if (button) {

            button.disabled =
                true;

        }


        const result =
            await API.nextMemberKode();


        if (
            !result ||
            !result.success
        ) {

            input.value = "";


            console.error(
                "NEXT KODE ERROR:",
                result
                    ? result.error
                    : "Unknown error"
            );


            if (button) {

                button.disabled =
                    false;

            }


            return;

        }


        const kode =
            result.data;


        /*
        ==================================
        TAMPILKAN KODE
        ==================================
        */

        input.value =
            kode;


        /*
        ==================================
        LOAD INFO CARD
        ==================================
        */

        await MemberInfoCard.load(
            kode
        );


        if (button) {

            button.disabled =
                false;

        }

    },


    async submit() {

        const kodeInput =
            document.getElementById(
                "member-kode"
            );


        const namaInput =
            document.getElementById(
                "member-nama"
            );


        const paymentInput =
            document.getElementById(
                "member-payment"
            );


        const button =
            document.getElementById(
                "member-submit"
            );


        const message =
            document.getElementById(
                "member-message"
            );


        const kode =
            kodeInput.value.trim();


        const nama =
            namaInput.value.trim();


        const payment =
            paymentInput.value.trim();


        /*
        ==================================
        VALIDASI KODE
        ==================================
        */

        if (
            !/^TM-\d{4}$/.test(
                kode
            )
        ) {

            this.showMessage(
                message,
                "Kode belum tersedia.",
                "error"
            );


            return;

        }


        /*
        ==================================
        VALIDASI NAMA
        ==================================
        */

        if (!nama) {

            this.showMessage(
                message,
                "Guest Name wajib diisi.",
                "error"
            );


            namaInput.focus();


            return;

        }


        /*
        ==================================
        VALIDASI PAYMENT
        ==================================
        */

        if (!payment) {

            this.showMessage(
                message,
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


        message.className =
            "form-message";


        message.textContent =
            "";


        /*
        ==================================
        API ADD MEMBER
        ==================================
        */

        const result =
            await API.addMember({

                Kode:
                    kode,

                Nama:
                    nama,

                Payment:
                    payment

            });


        /*
        ==================================
        STOP LOADING
        ==================================
        */

        button.disabled = false;


        button.textContent =
            "ADD MEMBER";


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
        DUPLICATE KODE
        ==================================
        */

        if (
            result.data ===
            "KODE DUPLICATE"
        ) {

            APP.showNotification(
                "Kode sudah digunakan.",
                "error"
            );


            /*
            KODE TETAP
            */

            kodeInput.focus();


            return;

        }


        /*
        ==================================
        SUCCESS
        ==================================
        */

        if (
            result.data ===
            "ADD MEMBER SUCCESS"
        ) {

            APP.showNotification(
                "ADD MEMBER SUCCESS",
                "success"
            );


            /*
            ==================================
            CLEAR NAMA & PAYMENT
            ==================================
            */

            namaInput.value = "";

            paymentInput.value = "";


            /*
            ==================================
            LOAD MEMBER YANG BARU DIBUAT
            ==================================
            */

            await MemberInfoCard.load(
                kode
            );


            /*
            ==================================
            KODE TETAP
            ==================================
            */

            namaInput.focus();


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