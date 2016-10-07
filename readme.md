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
