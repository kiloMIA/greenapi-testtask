document.addEventListener('DOMContentLoaded', () => {
    const idInstanceInput = document.getElementById('idInstance');
    const apiTokenInstanceInput = document.getElementById('apiTokenInstance');
    const responseOutput = document.getElementById('responseOutput');

    const getSettingsBtn = document.getElementById('getSettingsBtn');
    const getStateInstanceBtn = document.getElementById('getStateInstanceBtn');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const sendFileByUrlBtn = document.getElementById('sendFileByUrlBtn');

    const apiUrl = 'https://7103.api.greenapi.com/waInstance';

    if (localStorage.getItem('idInstance')) {
        idInstanceInput.value = localStorage.getItem('idInstance');
    }
    if (localStorage.getItem('apiTokenInstance')) {
        apiTokenInstanceInput.value = localStorage.getItem('apiTokenInstance');
    }

    idInstanceInput.addEventListener('input', () => {
        localStorage.setItem('idInstance', idInstanceInput.value);
    });

    apiTokenInstanceInput.addEventListener('input', () => {
        localStorage.setItem('apiTokenInstance', apiTokenInstanceInput.value);
    });

    const getFormattedResponse = (response) => JSON.stringify(response, null, 2);

    const adjustOutputHeight = () => {
        responseOutput.style.height = 'auto';
        responseOutput.style.height = responseOutput.scrollHeight + 'px';
    };

    getSettingsBtn.addEventListener('click', () => {
        const idInstance = idInstanceInput.value;
        const apiTokenInstance = apiTokenInstanceInput.value;

        axios.get(`${apiUrl}${idInstance}/getSettings/${apiTokenInstance}`)
            .then(response => {
                responseOutput.value = getFormattedResponse(response.data);
                adjustOutputHeight();
            })
            .catch(error => {
                responseOutput.value = `Error: ${error.message}`;
                adjustOutputHeight();
            });
    });

    getStateInstanceBtn.addEventListener('click', () => {
        const idInstance = idInstanceInput.value;
        const apiTokenInstance = apiTokenInstanceInput.value;

        axios.get(`${apiUrl}${idInstance}/getStateInstance/${apiTokenInstance}`)
            .then(response => {
                responseOutput.value = getFormattedResponse(response.data);
                adjustOutputHeight();
            })
            .catch(error => {
                responseOutput.value = `Error: ${error.message}`;
                adjustOutputHeight();
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
                adjustOutputHeight();
            })
            .catch(error => {
                responseOutput.value = `Error: ${error.message}`;
                adjustOutputHeight();
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
                adjustOutputHeight();
            })
            .catch(error => {
                responseOutput.value = `Error: ${error.message}`;
                adjustOutputHeight();
            });
    });
});

