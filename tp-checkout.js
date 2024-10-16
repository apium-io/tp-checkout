(function() {
    // Widget initialization function
    function initThirdPayWidget(config) {
        // Validate config parameters
        if (!config.merchantKey || !config.merchantTransactionReference || !config.amount) {
            console.error('ThirdPay Widget: Missing required parameters.');
            return;
        }

        // Wait until the DOM is fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Create the widget container (button)
            var widgetContainer = document.createElement('div');
            widgetContainer.style.width = '100%';
            widgetContainer.style.maxWidth = '480px';
            widgetContainer.innerHTML = `
                <div style="background-color: #1e1e28; border-radius: 8px;">
                    <div style="display: flex; justify-content: center; border-bottom: 2px solid #58585b; padding-top: 20px; padding-bottom: 20px;">
                        <img src="https://cdn.prod.website-files.com/6639c04abf79e9627e4cbbc5/6639c1189a4ab33de95344f7_ThirdPay%20Logo.svg" alt="thirdpay" style="height: 40px; margin: auto;">
                    </div>
                    <div style="display: flex; justify-content: center; padding: 20px; ">
                        <button id="thirdpay-button" 
                        style="background-color: #34b6f8; color: #000000; padding: 10px 20px; border: none; border-radius: 25px; cursor: pointer; width: 100%; font-size: 15px;">
                            Pay with Unlimit
                        </button>
                    </div>
                </div>
            `;

            // Append the widget to the user-specified container
            var containerElement = document.getElementById(config.container);
            if (containerElement) {
                containerElement.appendChild(widgetContainer);
            } else {
                console.error('ThirdPay Widget: Invalid container element ID.');
                return;
            }

            // Handle button click to open popup
            document.getElementById('thirdpay-button').addEventListener('click', function() {
                openThirdPayPopup(config);
            });
        });
    }

    // Function to open the popup with the desired URL
    function openThirdPayPopup(config) {        
        fetchGetifyUrl(config).then(function(popupUrl) {
            if (popupUrl) {
                // Create popup container
                var popupContainer = document.createElement('div');
                popupContainer.style.position = 'fixed';
                popupContainer.style.top = '0';
                popupContainer.style.left = '0';
                popupContainer.style.width = '100%';
                popupContainer.style.height = '100%';
                popupContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
                popupContainer.style.zIndex = '9999';
                popupContainer.style.display = 'flex';
                popupContainer.style.justifyContent = 'center';
                popupContainer.style.alignItems = 'center';

                // Create iframe to load the URL
                var iframe = document.createElement('iframe');
                iframe.src = popupUrl;
                iframe.style.width = '80%';
                iframe.style.height = '80%';
                iframe.style.border = 'none';
                iframe.style.borderRadius = '10px';

                // Append iframe to popup container
                popupContainer.appendChild(iframe);

                // Append popup container to body
                document.body.appendChild(popupContainer);

                // Close popup when clicked outside the iframe
                popupContainer.addEventListener('click', function(event) {
                    if (event.target === popupContainer) {
                        document.body.removeChild(popupContainer);
                    }
                });
            } else {
                console.error('ThirdPay Widget: Failed to fetch a valid URL.');
            }
        }).catch(function(error) {
            console.error('ThirdPay Widget: Error fetching URL -', error);
        });
    }
    async function fetchGetifyUrl(config) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "crypto": "sol",
            "fiat": "usd",
            "paymentMethod": "debitcard",
            "amount": 121232,
            "walletAddress": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
            "type": "onramp",
            "country": "us",
            "onramp": "gatefi",
            "merchantKey": "tpay-b-6l6xqUfgBFPsf-AFp4bOm-1726798024849-fx7UzupSeEIU0_RJOWknj",
            "merchantTransactionReference": "merchRefSample1234",
            "userEmail": "adithya@apium.io"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            let response = await fetch("https://ghesup2kz6.execute-api.eu-central-1.amazonaws.com/dev/transactions/merchant/checkout", requestOptions);
            let result = await response.json();
            if (result.status === "Success" && result.data && result.data.url) {
                return result.data.url;
            } else {
                throw new Error("Invalid response structure");
            }
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    // Expose the widget initialization globally
    window.ThirdPay = {
        init: initThirdPayWidget
    };
})();
