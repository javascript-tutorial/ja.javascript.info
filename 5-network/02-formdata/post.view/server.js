const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const getRawBody = require('raw-body')
const busboy = require('async-busboy');
const Router = require('koa-router');

let router = new Router();

router.post('/user', async (ctx) => {
  ctx.body = {
<<<<<<< HEAD
    message: "User saved."
=======
    message: "User saved"
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b
  };
});

router.post('/image-form', async (ctx) => {

  let files = [];
  const { fields } = await busboy(ctx.req, {
    onFile(fieldname, file, filename, encoding, mimetype) {
      // read all file stream to continue
      let length = 0;
      file.on('data', function(data) {
        length += data.length;
      });
      file.on('end', () => {
        files.push({
          fieldname,
          filename,
          length
        });
      });
    }
  });

  ctx.body = {
<<<<<<< HEAD
    message: `Image saved, firstName: ${fields.firstName}, Image size:${files[0].length}, fileName: ${files[0].filename}.`
=======
    message: `Image saved, firstName: ${fields.firstName}, Image size:${files[0].length}, fileName: ${files[0].filename}`
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b
  };
});


router.post('/user-avatar', async (ctx) => {

  let files = [];
  const { fields } = await busboy(ctx.req, {
    onFile(fieldname, file, filename, encoding, mimetype) {
      // read all file stream to continue
      let length = 0;
      file.on('data', function(data) {
        length += data.length;
      });
      file.on('end', () => {
        files.push({
          fieldname,
          filename,
          length
        });
      });

    }
  });

  ctx.body = {
<<<<<<< HEAD
    message: `User with picture, firstName: ${fields.firstName}, picture size:${files[0].length}.`
=======
    message: `User with picture, firstName: ${fields.firstName}, picture size:${files[0].length}`
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b
  };
});

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());


if (!module.parent) {
  http.createServer(app.callback()).listen(8080);
} else {
  exports.accept = app.callback();
}
