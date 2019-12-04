const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

// get model registered earlier
const User = mongoose.model('User')
const Post = mongoose.model('Post')

exports.signup = (req, res) => {

	const newUser = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		about: req.body.about,
		birthday: req.body.birthday
	})

	newUser.save((err) => {
		if (err) { return res.send({ success: false})}
		else { return res.send({ success: true })}
	})
}

exports.login = (req, res) => {

	const email = req.body.email
	const password = req.body.password


	/*
		1. Does email exist
		2. Is the password correct?
		3. Create a token and return to client
	*/

	User.findOne({ email }, (err, user) => {
		if (err || !user) {
			// Case 1 - email doesn't exist
			console.log('case 1')
			return res.send({ success: false })
		}

		user.comparePassword(password, (compareErr, isMatch) => {
			if (compareErr || !isMatch) {
				// Case 2 - password is wrong
				console.log('case 2')
				return res.send({ success: false })
			}

			//Case 3 - credentials are correct
			//create a token
			const payload = {
				_id: user._id
			}

			const token = jwt.sign(payload, 'THIS_IS_A_SECRET')

			console.log('case 3')
			return res.send({ success: true, token, username: user.name })

		})
	})

}

exports.getInfo = (req, res) => {
	const username = req.body.username
	
	if(!username){
		console.log('an oopsie happened')
	}else{
		User.findOne({ name: username }, (err, user) => {
			console.log(user)
			return res.send({email: user.email, about: user.about, birthday: user.birthday})
		})
	}
}

exports.editProfile = (req, res) => { //name, email, password, about, birthday
	const username = req.body.username
	const name = req.body.name
	const email = req.body.email
	const password = req.body.password
	const about = req.body.about
	const birthday = req.body.birthday
	
	if(!(name || email || password || about || birthday)){
		console.log('an oopsie happened, nothing to change to')
	}else{
		User.findOne({ name: username}, (err, user) => {
			console.log(user)
			if(name){user.name = name}
			if(email){user.email = email}
			if(password){user.password = password}
			if(about){user.about = about}
			if(birthday){user.birthday = birthday}
			console.log(user)
			user.save()
			return(res.send({success: true, username: name}))
		})
	}
}

exports.addPost = (req, res) => {
	const username = req.body.username
	console.log(req.body.date)
	const newPost = new Post({
		author: username,
		content: req.body.content,
		timestamp: req.body.date
	})
	
	console.log(newPost.author, newPost.content, newPost.timestamp)

	newPost.save((err) => {
		if (err) { return res.send({ success: false})}
		else { return res.send({ success: true })}
	})
}

exports.editPost = (req, res) => {
	const author = req.body.author
	const content = req.body.content
	
	if(!content){
		console.log('an oopsie happened, nothing to change to')
	}else{
		Post.findOne({ author: author}, (err, post) => {
			post.content = content
			post.save()
			return(res.send({success: true}))
		})
	}
}

exports.deletePost = (req, res) => {
	const author = req.body.author
	const id = req.body._id
	
	if(!author){
		console.log('an oopsie happened, nothing to delete')
	}else{
		Post.deleteOne(id, (err, post) =>{
			if (err){return(res.send({success: false}))}
			else{return(res.send({success: true}))}
		})
	}
}

exports.doPostArray = (req, res) => {
	const username = req.body.username
	var postArray = []
	console.log(username)
	Post.find({ author: username }, (err, posts) => {
		return res.send({ postArray: posts })
	})
}

exports.checkIfLoggedIn = (req, res) => {

	const cookies = req.cookies

	/*
	1. are there cookies? is auth token included?
	2. are the contents valid?
	*/

	if (!cookies || !cookies.authToken) {
		console.log('no cookies')
		return res.send({ isLoggedIn: false })
	}

	jwt.verify(cookies.authToken, 'THIS_IS_A_SECRET', (err, payload) => {

		if (err) {
			console.log('error decoding')
			return res.send({ isLoggedIn: false })
		}

		User.findOne({ _id: payload._id }, (err, user) => {

			if (err || !user) {
				console.log('User not found')
				return res.send({ isLoggedIn: false })
			}

			else {
				console.log('is Logged In')
				return res.send({ isLoggedIn: true })
			}
		})

	})
}

