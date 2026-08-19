const MemberInfoCard = {

    /*
    ======================================
    RENDER
    ======================================
    */

    render() {

        const container =
            document.getElementById(
                "member-info-container"
            );


        if (!container) {

            return;

        }


        container.innerHTML = `

            <div
                id="stamp-info-card"
                class="info-card"
            >

                <!--
                ==================================
                REWARD WATERMARK
                ==================================
                -->

                <div
    id="info-reward-watermark"
    class="info-reward-watermark"
>

    <img
        src="/logo/logo.png"
        alt=""
        class="reward-watermark-logo"
    >

    <span
        id="info-reward-text"
    ></span>

</div>

                <div class="info-card-header">

                    <span>
                        MEMBER INFO
                    </span>


                    <div
                        class="info-card-actions"
                    >

                        <button
                            type="button"
                            id="stamp-info-button"
                            class="info-button"
                        >
                            INFO
                        </button>


                        <button
                            type="button"
                            id="url-copy-button"
                            class="info-button"
                        >
                            URL COPY
                        </button>

                    </div>

                </div>


                <div class="info-card-body">


                    <!-- ==========================
                         KODE
                         ========================== -->

                    <div class="info-item">

                        <span class="info-label">
                            Kode
                        </span>

                        <span
                            id="info-kode"
                            class="info-value"
                        >
                            -
                        </span>

                    </div>


                    <!-- ==========================
                         NAMA
                         ========================== -->

                    <div class="info-item">

                        <span class="info-label">
                            Nama
                        </span>

                        <span
                            id="info-nama"
                            class="info-value"
                        >
                            -
                        </span>

                    </div>


                    <!-- ==========================
                         AVAILABLE STAMP
                         ========================== -->

                    <div class="info-item">

                        <span class="info-label">
                            Available Stamp
                        </span>

                        <span
                            id="info-available"
                            class="info-value"
                        >
                            -
                        </span>

                    </div>


                    <!-- ==========================
                         LAST STAMP
                         ========================== -->

                    <div class="info-item">

                        <span class="info-label">
                            Last Stamp
                        </span>

                        <span
                            id="info-last-stamp"
                            class="info-value"
                        >
                            -
                        </span>

                    </div>


                    <!-- ==========================
                         STAMP AMOUNT
                         ========================== -->

                    <div class="info-item">

                        <span class="info-label">
                            Stamp Amount
                        </span>

                        <span
                            id="info-stamp-amount"
                            class="info-value"
                        >
                            -
                        </span>

                    </div>


                    <!-- ==========================
                         LAST USED
                         ========================== -->

                    <div class="info-item">

                        <span class="info-label">
                            Last Used
                        </span>

                        <span
                            id="info-last-used"
                            class="info-value"
                        >
                            -
                        </span>

                    </div>


                </div>

            </div>

        `;


        this.bind();

    },


    /*
    ======================================
    BIND
    ======================================
    */

    bind() {

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
                        this.getKode();


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
        URL COPY BUTTON
        ==================================
        */

        const urlButton =
            document.getElementById(
                "url-copy-button"
            );


        if (urlButton) {

            urlButton.addEventListener(
                "click",
                async () => {

                    await this.copyUrl(
                        urlButton
                    );

                }
            );

        }

    },


    /*
    ======================================
    GET KODE
    ======================================
    */

    getKode() {

        const kodeElement =
            document.getElementById(
                "info-kode"
            );


        if (!kodeElement) {

            return "";

        }


        const kode =
            kodeElement.textContent.trim();


        if (
            !kode ||
            kode === "-"
        ) {

            return "";

        }


        return kode;

    },


    /*
    ======================================
    COPY URL
    ======================================
    */

    async copyUrl(button) {

        const kode =
            this.getKode();


        if (!kode) {

            return;

        }


        const originalText =
            button.textContent;


        button.disabled = true;

        button.textContent =
            "COPYING...";


        try {

            const result =
                await API.getMemberUrl(
                    kode
                );


            if (
                !result ||
                !result.success
            ) {

                button.textContent =
                    "ERROR";

                return;

            }


            const url =
                result.data;


            if (
                !url
            ) {

                button.textContent =
                    "NO URL";

                return;

            }


            await navigator.clipboard.writeText(
                url
            );


            button.textContent =
                "COPIED";


        } catch (error) {

            console.error(
                "URL COPY ERROR:",
                error
            );


            button.textContent =
                "ERROR";


        } finally {

            setTimeout(
                () => {

                    button.disabled =
                        false;

                    button.textContent =
                        originalText;

                },
                1200
            );

        }

    },


    /*
    ======================================
    LOAD INFO
    ======================================
    */

    async load(kode) {

        if (!kode) {

            this.clear();

            return;

        }


        const result =
            await API.info(
                kode
            );


        if (
            !result ||
            !result.success
        ) {

            this.clear();

            return;

        }


        const data =
            result.data;


        if (!data) {

            this.clear();

            return;

        }


        /*
        ==============================
        KODE
        ==============================
        */

        const kodeElement =
            document.getElementById(
                "info-kode"
            );


        if (kodeElement) {

            kodeElement.textContent =
                data.kode || "-";

        }


        /*
        ==============================
        NAMA
        ==============================
        */

        const namaElement =
            document.getElementById(
                "info-nama"
            );


        if (namaElement) {

            namaElement.textContent =
                data.nama || "-";

        }


        /*
        ==============================
        AVAILABLE STAMP
        ==============================
        */

        const availableElement =
            document.getElementById(
                "info-available"
            );


        if (availableElement) {

            availableElement.textContent =
                data.availableStamp ??
                "-";

        }


        /*
        ==============================
        REWARD WATERMARK
        ==============================
        */



        this.updateRewardWatermark(
            data.availableStamp
        );


        /*
        ==============================
        LAST STAMP
        ==============================
        */

        const lastStampElement =
            document.getElementById(
                "info-last-stamp"
            );


        if (lastStampElement) {

            lastStampElement.textContent =
                this.formatDateTime(
                    data.lastStamp
                );

        }


        /*
        ==============================
        STAMP AMOUNT
        ==============================
        */

        const stampAmountElement =
            document.getElementById(
                "info-stamp-amount"
            );


        if (stampAmountElement) {

            stampAmountElement.textContent =
                data.stampAmount ??
                "-";

        }


        /*
        ==============================
        LAST USED
        ==============================
        */

        const lastUsedElement =
            document.getElementById(
                "info-last-used"
            );


        if (lastUsedElement) {

            lastUsedElement.textContent =
                this.formatDateTime(
                    data.lastUsed
                );

        }

    },


    /*
    ======================================
    UPDATE REWARD WATERMARK
    ======================================
    */

    updateRewardWatermark(available) {

    const watermark =
        document.getElementById(
            "info-reward-watermark"
        );


    const text =
        document.getElementById(
            "info-reward-text"
        );


    if (
        !watermark ||
        !text
    ) {

        return;

    }


    const value =
        Number(
            available
        );


    if (
        !Number.isFinite(value) ||
        value < 10
    ) {

        text.textContent =
            "";

        watermark.style.display =
            "none";

        return;

    }


    const reward =
        Math.floor(
            value / 10
        );


    text.textContent =
        reward +
        " Reward ready to claim";


    watermark.style.display =
        "flex";

},


    /*
    ======================================
    FORMAT DATE TIME
    ======================================
    */

    formatDateTime(value) {

        if (!value) {

            return "-";

        }


        const date =
            new Date(value);


        if (
            isNaN(
                date.getTime()
            )
        ) {

            return value;

        }


        const months = [

            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"

        ];


        const day =
            String(
                date.getDate()
            ).padStart(
                2,
                "0"
            );


        const month =
            months[
                date.getMonth()
            ];


        const year =
            String(
                date.getFullYear()
            ).slice(-2);


        const hours =
            String(
                date.getHours()
            ).padStart(
                2,
                "0"
            );


        const minutes =
            String(
                date.getMinutes()
            ).padStart(
                2,
                "0"
            );


        return (
            day +
            " " +
            month +
            " " +
            year +
            " " +
            hours +
            ":" +
            minutes +
            " WIB"
        );

    },


    /*
    ======================================
    CLEAR INFO
    ======================================
    */

    clear() {

        const ids = [

            "info-kode",

            "info-nama",

            "info-available",

            "info-last-stamp",

            "info-stamp-amount",

            "info-last-used"

        ];


        ids.forEach(
            id => {

                const element =
                    document.getElementById(
                        id
                    );


                if (element) {

                    element.textContent =
                        "-";

                }

            }
        );


        /*
        ==============================
        CLEAR WATERMARK
        ==============================
        */

        const watermark =
    document.getElementById(
        "info-reward-watermark"
    );


const text =
    document.getElementById(
        "info-reward-text"
    );


if (watermark) {

    watermark.style.display =
        "none";

}


if (text) {

    text.textContent =
        "";

}

    }

};