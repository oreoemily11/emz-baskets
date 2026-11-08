# EMZ Baskets website

The static site lives in `dist/`. Preview it with `python3 -m http.server 8000 --directory dist`.

## Cloudflare Pages

Connect the repository to Pages using branch `main`, framework preset **None**, an empty build command and output directory `dist`. After a successful build, attach the domain in the Pages project's **Custom domains** settings.

## Requests

The form prepares an email to the business address. Customers review it in their email app and press Send. The site does not collect payments. Verify email routing and test an order from a separate mailbox before opening intake.

Keep private inbox details, credentials and customer records outside this repository.
