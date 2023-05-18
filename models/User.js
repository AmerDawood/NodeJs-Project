const connection = require('../DB/db_connection')
const { userValidator, loginValidator } = require('../validator')
const { hashSync, compareSync } = require('bcryptjs')

class User {
    constructor(userData) {
        this.userData = userData;
    }

    save(cb) {
        connection('users', async (collection) => {
            try {
                const hashedPassword = hashSync(this.userData.password, 12)
                this.userData.password = hashedPassword

                await collection.insertOne(this.userData)
                    .then(result => {
                        cb({
                            status: true,
                            _user_id: result.insertedId
                        })
                    })

            } catch (err) {
                cb({
                    status: false,
                    message: err.message
                })
            }
        })
    }

    isExist() {
        return new Promise((resolve, reject) => {
            connection('users', async (collection) => {
                try {
                    const user = await collection.findOne({
                        '$or': [
                            {username: this.userData.username},
                            {email: this.userData.email}
                        ]
                    })

                    if (!user) {
                        resolve({
                            check: false
                        })
                    } else {
                        if (user.email === this.userData.email) {
                            resolve({
                                check: true,
                                message: 'The email is already used'
                            })
                        } else if (user.username === this.userData.username) {
                            resolve({
                                check: true,
                                message: 'The username is already used'
                            })
                        }
                    }
                } catch (err) {
                    reject(err)
                }
            })
        })
    }

    static validate(userData) {
        try {
            const validationResult = userValidator.validate(userData)
            return validationResult;
        } catch (err) {
            return false;
        }
    }

    static login(loginData) {
        return new Promise((resolve, reject) => {
            // validation
            const validation = loginValidator.validate(loginData)
            if (validation.error) {
                const error = new Error(validation.error.message)
                error.statusCode = 400
                resolve(error)
            }

            // find user
            connection('users', async (collection) => {
                try {
                    const user = await collection.findOne({
                        $or:[
                            {username: loginData.username},
                            {email: loginData.username}
                        ]},
                        {projection: {username: 1, password: 1}}
                    )

                    if (!user || !compareSync(loginData.password, user.password)) {
                        const error = new Error('Wrong or not found username or password')
                        error.statusCode = 401
                        resolve(error)
                    }

                    resolve(user)
                } catch (err) {
                    reject(err)
                }
            })
        })
    }
}

// const user = new User({
//     name: 'Ahmed Ali',
//     email: 'hamm@gmail.com',
//     username: 'aali',
//     password: '11111aaaaa'
// })

// User.validate(user.userData)

// user.save()

// user.isExist()
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => console.log(err))


module.exports = User