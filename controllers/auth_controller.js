const { User } = require("../models");
const { secret } = require("../token-config");

var jwt = require("jsonwebtoken");

const createError = require("http-errors");

exports.register = (req, res, next) => {
  const validation = User.validate(req.body);
  //Delete this

  if (validation.error) {
    const error = createError(400, validation.error.message);
    next(error);
  } else {
    const user = new User(req.body);

    user
      .isExist()
      .then((result) => {
        if (result.check) {
          console.log(result.message);

          next(createError(409, result.message));
        } else {
          // Save User to Database
          user.save((status) => {
            console.log(status);
            if (status.status) {
              res.status(201).json({
                status: true,
                _id: status._user_id,
                message: "User has been created successfully",
              });
            }
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        next(createError(500, err.message));
      });
  }
};
exports.login = (req, res, next) => {
  User.login(req.body)
    .then((result) => {
      if (result instanceof Error) {
        next(createError(result.statusCode, result.message));
      } else {
        const ageInSeconds = 1 * 24 * 60 * 60;
        const token = jwt.sign({ id: result._id }, secret, {
          expiresIn: ageInSeconds, // 24 hours
        });

        result.token = token;
        res.cookie("jwt", token, { httpOnly: true, maxAge: ageInSeconds * 1000 });
        res.status(200).json(result);
      }
    })
    .catch((err) => {
      next(createError(500, err.message));
    });
};









