document.addEventListener('DOMContentLoaded', () => {
    const idInstanceInput = document.getElementById('idInstance');
    const apiTokenInstanceInput = document.getElementById('apiTokenInstance');
    const responseOutput = document.getElementById('responseOutput');

    const getSettingsBtn = document.getElementById('getSettingsBtn');
    const getStateInstanceBtn = document.getElementById('getStateInstanceBtn');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const sendFileByUrlBtn = document.getElementById('sendFileByUrlBtn');

    const apiUrl = 'https://7103.api.greenapi.com/waInstance';

    const getFormattedResponse = (response) => JSON.stringify(response, null, 2);

    getSettingsBtn.addEventListener('click', () => {
        const idInstance = idInstanceInput.value;
        const apiTokenInstance = apiTokenInstanceInput.value;

        axios.get(`${apiUrl}${idInstance}/getSettings/${apiTokenInstance}`)
            .then(response => {
                responseOutput.value = getFormattedResponse(response.data);
            })
            .catch(error => {
                responseOutput.value = `Error: ${error.message}`;
            });
    });

    getStateInstanceBtn.addEventListener('click', () => {
        const idInstance = idInstanceInput.value;
        const apiTokenInstance = apiTokenInstanceInput.value;

        axios.get(`${apiUrl}${idInstance}/getStateInstance/${apiTokenInstance}`)
            .then(response => {
                responseOutput.value = getFormattedResponse(response.data);
            })
            .catch(error => {
                responseOutput.value = `Error: ${error.message}`;
            });
    });

    sendMessageBtn.addEventListener('click', () => {
        const idInstance = idInstanceInput.value;
        const apiTokenInstance = apiTokenInstanceInput.value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const messageText = document.getElementById('messageText').value;

        const data = {
            chatId: `${phoneNumber}@c.us`,
            message: messageText
        };

        axios.post(`${apiUrl}${idInstance}/sendMessage/${apiTokenInstance}`, data)
            .then(response => {
                responseOutput.value = getFormattedResponse(response.data);
            })
            .catch(error => {
                responseOutput.value = `Error: ${error.message}`;
            });
    });

    sendFileByUrlBtn.addEventListener('click', () => {
        const idInstance = idInstanceInput.value;
        const apiTokenInstance = apiTokenInstanceInput.value;
        const filePhoneNumber = document.getElementById('filePhoneNumber').value;
        const fileUrl = document.getElementById('fileUrl').value;
        const fileName = document.getElementById('fileName').value;

        const data = {
            chatId: `${filePhoneNumber}@c.us`,
            urlFile: fileUrl,
            fileName: fileName
        };

        axios.post(`${apiUrl}${idInstance}/sendFileByUrl/${apiTokenInstance}`, data)
            .then(response => {
                responseOutput.value = getFormattedResponse(response.data);
            })
            .catch(error => {
                responseOutput.value = `Error: ${error.message}`;
            });
    });
});
