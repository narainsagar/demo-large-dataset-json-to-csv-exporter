## demo-large-dataset-json-to-csv-exporter
Demo - Large dataset collection JSON data to CSV export and download attachment..

**Prerequisites:** 
You must have following installed on your machine..

- NodeJS and npm (https://nodejs.org/)
- Bower (http://bower.io/#install-bower)

## Installing dependencies:

Run the following command:

`$ bower install && npm install`

### Running the project:

First `cd` into project root directory:

`$ cd <path/to/your/project/>`

After then, run this command to serve locally:

`$ node app.js`

after this open `http://localhost:5000/` in your browser's tab.

That's all you need.. Enjoy.

# Tech's used:
- [csvwriter](https://github.com/GazonkFoo/csvwriter)
- [Mongodb](https://github.com/mongodb/node-mongodb-native)
- [Mongoose](https://github.com/Automattic/mongoose)
- [express](https://github.com/expressjs/express) 
- [jade](https://github.com/jadejs/jade)
- [bootstrap](https://github.com/twbs/bootstrap)
- [jade-bootstrap](https://github.com/rajasegar/JADE-Bootstrap)

# TODO
For now, I have used streams with [csvwriter](https://github.com/GazonkFoo/csvwriter) which results bit slow downloading when we have very very lage dataset.. We have to update it to use [mongoose-to-csv](https://github.com/nickpisacane/mongooseToCsv) api which export all collection to direct csv and in result we will have good performance (fast download).


Cheers!

# Whoami
**Narain Sagar**

![@narainsagar](https://avatars0.githubusercontent.com/narainsagar?&s=128)

[Website](http://narainsagar.com/) | [Twitter](https://twitter.com/narainsagar) | [LinkedIn](https://www.linkedin.com/pk/narainsagar) |  [Facebook](https://facebook.com/NarainSagarPage) | [Github](https://github.com/narainsagar) | [Stack Overflow](www.stackoverflow.com/users/5228251/narainsagar)
