const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Name is required.'],
        minlenth:[2,'Name must have at least 2 letters.']},
    email: {
        type: String,
        required: [true, 'Email is required']},
        //validate email format with regex
        //alt method: validator dependency (server: npm i validator)
        //(inventory_management_repo)
        validate: {validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val), message: 'Valid email required.'},
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: [8, 'Password must have at least 8 characters.'],
        maxlength: [15, 'Password cannot exceed 15 characters.']}}, 
    { timestamps: true });

//compare password with confirmPassword using virtual table
UserSchema.virtual('confirmPassword')
            .get( () => this._confirmPassword)
            .set( () => this._confirmPassword = value);

//runs before 'validate', compares password/confirmPassword
UserSchema.pre('validate', function(next){
    if(this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'passwords do not match.');}
    next(); //moves on to next function (validate)
});

//next function called from .pre
//hash password before saving new user to db
UserSchema.pre('save', function(next) {
    bcrpt.hash(this.password,10) //10 rounds of salt
        .then(hash => { this.password = hash;
                        next();})
});

module.exports = mongoose.model('User', UserSchema)
