//Import the library into your project
var easyinvoice = require("easyinvoice");
let fs = require("fs");

module.exports = async bill => {
	// Create a new invoice
	let orderDate = new Date(bill.createdAt);
	let dueDate = new Date(bill.createdAt);
	dueDate.setFullYear(orderDate.getFullYear() + 10);
	new Date();
	var data = {
		// Customize enables you to provide your own templates
		// Please review the documentation for instructions and examples
		customize: {
			//  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
		},
		images: {
			// The logo on top of your invoice
			logo: "https://www.techandcodefactory.fr/image/logo/logo.png"
			// The invoice background
			// background: "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
		},
		// Your own data
		sender: {
			company: "Tech&Code",
			address: "Didot",
			zip: "75013",
			city: "Paris",
			country: "France"
		},
		// Your recipient
		client: {
			company: `${bill.user.firstname} ${bill.user.lastname}`,
			address: `${bill.billingAddress}`,
			country: `${bill.user.email}`
		},
		information: {
			// Invoice number
			number: `${bill.id}`,
			// Invoice data
			date: `${orderDate.toLocaleDateString("fr-FR")}`,
			// // Invoice due date
			"due-date": `${dueDate.toLocaleDateString("fr-FR")}`
		},
		// The products you would like to see on your invoice
		// Total values are being calculated automatically
		products: bill.orderProducts.map(product => {
			return {
				quantity: product.quantity,
				description: `Livre ${product.id}`,
				"tax-rate": 5.5,
				price: product.unitPrice
			};
		}),

		// The message you would like to display on the bottom of your invoice
		"bottom-notice": "",
		// Settings to customize your invoice
		settings: {
			currency: "EUR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
			locale: "fr-FR", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
			"tax-notation": "tva" // Defaults to 'vat'
			// "margin-top": 25, // Defaults to '25'
			// "margin-right": 25, // Defaults to '25'
			// "margin-left": 25, // Defaults to '25'
			// "margin-bottom": 25, // Defaults to '25'
			// "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
			// "height": "1000px", // allowed units: mm, cm, in, px
			// "width": "500px", // allowed units: mm, cm, in, px
			// "orientation": "landscape", // portrait or landscape, defaults to portrait
		},
		// Translate your invoice to your preferred language
		translate: {
			invoice: "FACTURE", // Default to 'INVOICE'
			number: "Numéro", // Defaults to 'Number'
			date: "Date", // Default to 'Date'
			"due-date": "Date d'expiration", // Defaults to 'Due Date'
			subtotal: "Sous-total", // Defaults to 'Subtotal'
			products: "Produits", // Defaults to 'Products'
			quantity: "Quantité", // Default to 'Quantity'
			price: "Prix", // Defaults to 'Price'
			"product-total": "Total", // Defaults to 'Total'
			total: "Total" // Defaults to 'Total'
		}
	};

	//Create your invoice! Easy!
	const file = await easyinvoice.createInvoice(data, function (result) {});
	//Save the PDF to a file
	fs.writeFileSync(`invoices/${bill.id}.pdf`, file.pdf, "base64");

	return file;
};
