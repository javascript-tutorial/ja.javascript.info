const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const getRawBody = require('raw-body')
<<<<<<< HEAD
const busboy = require('async-busboy');
=======
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
const Router = require('koa-router');

let router = new Router();

router.post('/user', async (ctx) => {
  ctx.body = {
    message: "User saved."
  };
});

router.post('/image', async (ctx) => {
  let body = await getRawBody(ctx.req, {
    limit: '1mb'
  });
  ctx.body = {
    message: `Image saved, size:${body.length}.`
  };
});

<<<<<<< HEAD
router.post('/image-form', async (ctx) => {

  let files = [];
  const { fields } = await busboy(ctx.req, {
    onFile(fieldname, file, filename, encoding, mimetype) {
      // read all file stream to continue
      getRawBody(file, { limit: '1mb'}).then(body => {
        files.push({
          fieldname,
          filename,
          length: body.length
        }); 
      })

    }
  });

  ctx.body = {
    message: `Image saved, name: ${fields.name}, size:${files[0].length}.`
  };
});

=======
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());


if (!module.parent) {
  http.createServer(app.callback()).listen(8080);
} else {
  exports.accept = app.callback();
}
