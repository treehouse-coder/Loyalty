const UsedForm = {

  render() {

    const content =
        document.getElementById(
            "content"
        );


    content.innerHTML = `

        <div class="page-header">

            <h2>
                Used
            </h2>

            <p>
                Use member stamp
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
            id="used-form"
            class="form"
        >

            <div class="form-group">

                <label for="used-kode">
                    Kode
                </label>

                <input
                    type="text"
                    id="used-kode"
                    placeholder="Masukkan nomor"
                    maxlength="4"
                    inputmode="numeric"
                    autocomplete="off"
                    required
                >

            </div>


            <div class="form-group">

                <label for="used-amount">
                    Used
                </label>

                <input
                    type="number"
                    id="used-amount"
                    min="1"
                    step="1"
                    inputmode="numeric"
                    autocomplete="off"
                    required
                >

            </div>


            <button
                type="submit"
                id="used-submit"
                class="primary-button"
            >
                USED
            </button>


            <div
                id="used-message"
                class="form-message"
            ></div>

        </form>

    `;


    this.bind();

},


bind() {

    const form =
        document.getElementById(
            "used-form"
        );


    const kodeInput =
        document.getElementById(
            "used-kode"
        );


    kodeInput.addEventListener(
        "input",
        () => {

            let value =
                kodeInput.value
                    .replace(/\D/g, "");


            value =
                value.substring(
                    0,
                    4
                );


            kodeInput.value =
                value;


            if (
                typeof MemberInfoCard !==
                "undefined"
            ) {

                MemberInfoCard.clear();

            }


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
            "used-kode"
        );


    const amountInput =
        document.getElementById(
            "used-amount"
        );


    const button =
        document.getElementById(
            "used-submit"
        );


    const message =
        document.getElementById(
            "used-message"
        );


    const rawKode =
        kodeInput.value.trim();


    const used =
        amountInput.value.trim();


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
    VALIDASI USED
    ==================================
    */

    if (
        !/^\d+$/.test(
            used
        ) ||
        Number(used) <= 0
    ) {

        APP.showNotification(
            "Used harus berupa angka.",
            "error"
        );


        amountInput.focus();

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
        await API.used({

            Kode: kode,

            Used: Number(
                used
            )

        });


    /*
    ==================================
    STOP LOADING
    ==================================
    */

    button.disabled = false;

    button.textContent =
        "USED";


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
    SUCCESS
    ==================================
    */

    if (
        result.data ===
        "USED SUCCESS"
    ) {

        APP.showNotification(
            "USED SUCCESS",
            "success"
        );


        amountInput.value =
            "";


        /*
        ==================================
        REFRESH INFO CARD
        ==================================
        */

        await MemberInfoCard.load(
            kode
        );


        amountInput.focus();

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

},

};