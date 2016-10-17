## Dashup

Demo: soon

- Angular 2 ( 2.0 final realase )
- Express
- jwt ( JSON Web Tokens )
- ng-semantic ( https://github.com/vladotesanovic/ngSemantic )
- SystemJS ( loader )
- mongoose

## Install

# Install dependencies
npm install

# start server
npm run develop

# Application url: http://localhost:3000
```

## Development
Uncomment in public/index.html:

```html
<script src="assets/js/systemjs.config.js"></script>
<script>
    System.import('app').catch(function(err) { console.error(err); });
</script>
```

Comment out
```html
<!-- Production mod -->
<script src="js/bundle.min.js"></script>
```


## Use

1. Signup in the site to create a new user
2. Create a feed at Feeds menu
3. Use the bellow instructions for mqtt authetication:
    Username: your email
    Password: your api token (Login in the site and click at your name in the menu to see your API Token)
4. You can only subscribe and publish to your own feeds