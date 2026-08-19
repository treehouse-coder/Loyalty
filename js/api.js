const API_URL =
    "https://script.google.com/macros/s/AKfycbz408TgKPLXDY6SNvhbfdcKD7VaQhl0932TXf8N3kJGHbW4ZiQrOAnTI9ftiiUHYN16/exec";


const API = {


    async post(data) {

        try {

            const response =
                await fetch(
                    API_URL,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "text/plain;charset=utf-8"
                        },

                        body:
                            JSON.stringify(data)
                    }
                );


            const result =
                await response.text();


            return {

                success: true,

                data: result

            };


        } catch (error) {

            console.error(
                "API ERROR:",
                error
            );


            return {

                success: false,

                error:
                    error.message

            };

        }

    },

        async nextMemberKode() {

    const result =
        await this.post({

            action:
                "nextMemberKode"

        });


    if (
        !result.success
    ) {

        return result;

    }


    try {

        const response =
            JSON.parse(
                result.data
            );


        return {

            success:
                response.success,

            data:
                response.data,

            error:
                response.error

        };

    } catch (error) {

        console.error(
            "NEXT MEMBER KODE PARSE ERROR:",
            error
        );


        console.error(
            "NEXT MEMBER KODE RAW RESPONSE:",
            result.data
        );


        return {

            success: false,

            error:
                "Invalid API response."

        };

    }

},

clearMemberInfo() {

    return this.post({

        action:
            "clearMemberInfo"

    });

},

    stamp(data) {

    return this.post({

        action: "stamp",

        Kode: data.Kode,

        Payment: data.Payment

    });

},


    async info(kode) {

        const result =
            await this.post({

                action: "info",

                Kode: kode

            });


        if (!result.success) {

            return result;

        }


        try {

            const response =
                JSON.parse(
                    result.data
                );


            return {

                success:
                    response.success,

                data:
                    response.data,

                error:
                    response.error

            };

        } catch (error) {

            console.error(
                "INFO PARSE ERROR:",
                error
            );


            console.error(
                "INFO RAW RESPONSE:",
                result.data
            );


            return {

                success: false,

                error:
                    "Invalid API response."

            };

        }

    },

    async getMemberUrl(kode) {

    const result =
        await this.post({

            action:
                "getMemberUrl",

            Kode:
                kode

        });


    if (
        !result.success
    ) {

        return result;

    }


    try {

        const response =
            JSON.parse(
                result.data
            );


        return {

            success:
                response.success,

            data:
                response.data,

            error:
                response.error

        };

    } catch (error) {

        console.error(
            "GET URL PARSE ERROR:",
            error
        );


        return {

            success: false,

            error:
                "Invalid API response."

        };

    }

},


    addMember(data) {

        return this.post({

            action: "addmember",

            Kode: data.Kode,

            Nama: data.Nama,

            Payment: data.Payment

        });

    },


    used(data) {

return this.post({


    action:
        "used",


    Kode:
        data.Kode,


    Used:
        data.Used


});

},

};