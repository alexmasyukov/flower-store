const path = require('path')

const bookRoute = (req, res) => {
    const options = {
        // root: path.join(__dirname, ''),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
    // res.sendFile(__dirname + '/public/4cb61e9a-1c14-11ea-a5fd-0cc47a792c0a_id_4cb61e9a-1c14-11ea-a5fd-0cc47a792c0a.html')
    // res.set('Content-Type', 'application/pdf')
    res.sendFile(path.join(__dirname, '../public/functional-design-patterns-for-express-js_jmexpress-p1_0.html')) //options
    // res.download('./index.js', 'anothername.js', (err) => {
    //   console.log('file sent')
    // })
}

module.exports = bookRoute