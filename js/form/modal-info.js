const MemberInfoModal = {

    open(kode) {

        const existing =
            document.getElementById(
                "member-info-modal"
            );


        if (existing) {

            existing.remove();

        }


        const modal =
            document.createElement(
                "div"
            );


        modal.id =
            "member-info-modal";


        modal.className =
            "modal-overlay";


        modal.innerHTML = `

            <div class="modal">

                <div class="modal-header">

                    <h3>
                        Member Info
                    </h3>


                    <button
                        type="button"
                        id="member-info-close"
                        class="modal-close"
                    >
                        ×
                    </button>

                </div>


                <div class="modal-body">

                    <div class="member-info-code">

                        ${kode}

                    </div>


                    <div
                        id="member-info-table"
                        class="member-info-table"
                    >

                        Loading...

                    </div>

                </div>

            </div>

        `;


        document.body.appendChild(
            modal
        );


        document
            .getElementById(
                "member-info-close"
            )
            .addEventListener(
                "click",
                () => {

                    this.close();

                }
            );


        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    modal
                ) {

                    this.close();

                }

            }
        );


        this.load(
            kode
        );

    },


    async load(kode) {

        const container =
            document.getElementById(
                "member-info-table"
            );


        if (!container) {

            return;

        }


        const result =
            await API.info(
                kode
            );


        if (
            !result.success
        ) {

            container.innerHTML = `

                <div class="modal-error">

                    ${result.error || "Connection error."}

                </div>

            `;

            return;

        }


        const history =
    result.data.history || [];


        if (
            !history.length
        ) {

            container.innerHTML = `

                <div class="modal-empty">

                    No transaction history.

                </div>

            `;

            return;

        }


        let html = `

            <table>

                <thead>

                    <tr>

                        <th>
                            Tanggal
                        </th>

                        <th>
                            Stamp
                        </th>

                        <th>
                            Tanggal
                        </th>

                        <th>
                            Used
                        </th>

                    </tr>

                </thead>


                <tbody>

        `;


        history.forEach(
            row => {

                html += `

                    <tr>

                        <td>
                            ${
                                this.formatDateTime(
                                    row.tanggal
                                )
                            }
                        </td>

                        <td>
                            ${
                                row.stamp ?? "-"
                            }
                        </td>

                        <td>
                            ${
                                this.formatDateTime(
                                    row.usedDate
                                )
                            }
                        </td>

                        <td>
                            ${
                                row.used ?? "-"
                            }
                        </td>

                    </tr>

                `;

            }
        );


        html += `

                </tbody>

            </table>

        `;


        container.innerHTML =
            html;

    },


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
        minutes
        
    );

},


    close() {

        const modal =
            document.getElementById(
                "member-info-modal"
            );


        if (modal) {

            modal.remove();

        }

    }

};