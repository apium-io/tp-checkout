
# ThirdPay Widget Integration Guide

This guide will help you integrate the ThirdPay payment widget into your website. The widget allows users to make payments through Unlimit.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Example](#example)
- [Customization](#customization)
- [Error Handling](#error-handling)

---

## Installation

To use the ThirdPay widget, follow these steps:

1. Download or include the widget JavaScript file `tpay.js` in your project.
2. Add the required HTML structure where the widget will be rendered.

### Including the JavaScript File

You need to include the `tp-checkout.js` from statically in your HTML file before using the widget:

```html
<script src="https://cdn.statically.io/gh/apium-io/tp-checkout/main/tp-checkout.js"></script>
```

---

## Usage

You can initialize the widget with a simple script block where you provide your configuration options. Here's an example:

```html
<script>
    ThirdPay.init({
        merchantKey: 'your-merchant-key',
        merchantTransactionReference: 'your-transaction-reference',
        amount: 10, // Payment amount 
        container: 'thirdpay-container' // The container ID where the widget will be rendered
    });
</script>
```

### Required Parameters

- **merchantKey**: Your unique merchant key provided by ThirdPay.
- **merchantTransactionReference**: A unique transaction reference for the current payment.
- **amount**: The payment amount
- **container**: The ID of the HTML element where the widget will be embedded.

---

## Configuration

Below are the parameters required to configure the widget:

| Parameter                  | Description                                                                 |
|-----------------------------|-----------------------------------------------------------------------------|
| `merchantKey`               | Your unique merchant key for authenticating the transaction.                 |
| `merchantTransactionReference` | A unique reference ID for the transaction (should be unique for every transaction). |
| `amount`                    | The amount to be charged in EUR or your desired currency.                   |
| `container`                 | The ID of the element where the widget will be rendered.                     |

---

## Example

Here’s an example of how to include the widget on your page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ThirdPay Widget Example</title>
    <script src="tpay.js"></script>
</head>
<body>
    <!-- Container for the widget -->
    <div id="thirdpay-container"></div>

    <!-- Initialize the widget -->
    <script>
        ThirdPay.init({
            merchantKey: 'your-merchant-key',
            merchantTransactionReference: 'your-transaction-reference',
            amount: 50, // Payment amount in EUR
            container: 'thirdpay-container' // Container ID
        });
    </script>
</body>
</html>
```

---

## Customization

You can customize the widget's appearance by modifying the styles in the `tpay.js` file. The button and container styles can be updated to fit your website's design.

To modify the button or container styles, locate the following section in `tpay.js`:

```javascript
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
```

---

## Error Handling

The widget includes basic error handling for common issues:

- **Missing Required Parameters**: If required parameters (e.g., `merchantKey`, `merchantTransactionReference`, `amount`) are not provided, an error will be logged to the console.
- **Invalid Container**: If the container specified by the `container` parameter is not found in the DOM, an error will be logged to the console.
- **Failed URL Fetch**: If the API request to fetch the payment URL fails, an error will be logged.

For debugging, ensure you check your browser's console for any error messages.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
