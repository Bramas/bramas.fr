

Pages = new Mongo.Collection("pages");

var RemarkableParser = new Remarkable('full', {
	html:         false,        // Enable HTML tags in source
	xhtmlOut:     false,        // Use '/' to close single tags (<br />)
	breaks:       false,        // Convert '\n' in paragraphs into <br>
	langPrefix:   'language-',  // CSS language prefix for fenced blocks
	linkify:      true,         // autoconvert URL-like texts to links

	// Enable some language-neutral replacements + quotes beautification
	typographer:  false,

	// Double + single quotes replacement pairs, when typographer enabled,
	// and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
	quotes: '“”‘’'
});

var Page = React.createClass({
	// Make sure your component implements this method.
	getInitialState: function() {
		return {};
	},
	parseContent: function(content){
		//RemarkableParser.render(
		return content;
	},
	render: function (){
		return <div 
			className="page-content" 
			dangerouslySetInnerHTML={{__html: this.parseContent(this.props.content)}}
			></div>;
	}
});

var PagesEditor = React.createClass({
	getInitialState: function() {
		return {
			currentPageEditor: this.props.pages[0]
		};
	},
	componentWillReceiveProps: function(nextProps) {
		if(!this.state.currentPageEditor)
		{
			this.setState({
				currentPageEditor: nextProps.pages[0]
			});
		}
	},
	selectPageEditor: function(page)
	{
		this.setState({
			currentPageEditor: page
		});
	},
	render: function(){

		return <ul>
		 {this.props.pages.map(function(page) {
		 	var className = page._id == this.state.currentPageEditor._id ? 'page-editor-expanded' : 'page-editor-collapsed';
		 	return <div className={className} key={page._id}>
		 		<div className="page-editor-link" onClick={this.selectPageEditor.bind(this, page)}>{page.slug}</div>
		 		<WysiwygPageEditor page={page}/>
		 	</div>;
		 }.bind(this))}
		 </ul>;
	}
});

var PageEditor = React.createClass({
	// Make sure your component implements this method.
	getInitialState: function() {
		return {
			page:this.props.page, 
			saved: true
		};
	},
	componentWillReceiveProps: function(nextProps) {
		if(nextProps.page && this.state.page.content != nextProps.page.content)
		{
			this.setState({
				page: nextProps.page
			});
		}
	},
	handleChange: function(event) {
		var state = this.state;
		state.page.content = event.target.value;
		state.saved = false;
		this.setState(state);
		Pages.update(
			{_id:this.state.page._id}, 
			{$set:{content:state.page.content}}, 
			function () {
            	this.setState({saved : true})
        	}.bind(this)
        );
	},
	handleKey: function(event) {
		var ENTER_KEY = 13;
        if (event.which === ENTER_KEY) {
        //	this.props.onSubmit(this.refs.editField.getDOMNode().value);
		}
	},
	render: function (){
		if(!this.state.page.content)
		{
			return <div>loading...</div>;
		}

		return <div className={this.props.className+" page-editor"}><textarea 
		ref="editor"
		onChange={this.handleChange}
		onKeyDown={this.handleKey} 
		value={this.state.page.content} /></div>;
	}
});

var AppComponent = React.createClass({
	getInitialState: function() {
		return {};
	},
    render: function(){
		var content = this.props.page && this.props.page.content;
        return (
        	<div className="container">
        		<nav className="navbar navbar-default">
	        		<div className="container-fluid">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<a className="navbar-brand" href={Routes.home()}>Bramas.fr</a>
						</div>
			            <div className="navbar-collapse collapse">
							<ul className="nav navbar-nav">
								<li className={currentPage.slug=='home'?'active':''}><a href={Routes.home()}>Home</a></li>
								<li className={currentPage.slug=='about'?'active':''}><a href={Routes.page('about')}>About</a></li>
							</ul>
						</div>
					</div>
				</nav>
				<Layout>
	                <Page content={content} />
	            </Layout>
            </div>
        );
    }
});

var LoginPanel = React.createClass({
    getInitialState: function() {
      return {userEmailInput:'', userPasswordInput:'', disabled:false};
    },
    handleSubmit: function() {
    	this.setState({disabled: true});
      	Meteor.loginWithPassword(
      		this.state.userEmailInput,
      		this.state.userPasswordInput,
      		function(err){
    			this.setState({disabled: false});
    			if(err)
    			{
	      			console.log('login error:');
	      			console.log(err);
	      		}
      		}.bind(this));
    },
    handlePasswordChange: function(e) {
      this.setState({userPasswordInput: e.target.value});
    },
    handleEmailChange: function(e) {
      this.setState({userEmailInput: e.target.value});
    },
    render: function() {
      return (
        <form onSubmit={this.handleSubmit}>
          <input
          	type="text"
          	placeholder="Your Email"
            value={this.state.userEmailInput}
            onChange={this.handleEmailChange}
            ref="userEmailInput"
            disabled={this.state.disabled}
          /><br/>
          <input
          	type="password"
          	placeholder="Your Password"
            value={this.state.userPasswordInput}
            onChange={this.handlePasswordChange}
            ref="userPasswordInput"
            disabled={this.state.disabled}
          />
          <input 
          	type="submit" 
          	onClick={this.handleSubmit}
            disabled={this.state.disabled}
          	value="sign in" />
        </form>
      );
    }
  });

var UserPanel = React.createClass({
	getInitialState: function()
	{
		return {loading:false};
	},
	logout: function(){
		this.setState({loading: true});
		Meteor.logout(function(err){
			this.setState({loading: true});
			if(err)
			{
				console.log('logout error:');
				console.log(err);
			}
		})
	},
	render: function()
	{	
		if(!this.props.user)
		{
			return <div></div>;
		}
		return <div>
			<div>{this.props.user.username}</div>
			<button disabled={this.state.loading} onClick={this.logout}>logout</button>
		</div>
	}
});
var AdminComponent = React.createClass({
	getInitialState: function() {
		return {};
	},
    render: function(){
		//var content = this.state.page && this.state.page.content
		var user = Meteor.user();
		var isAdmin = user && user.group && user.group === 'administrator';
		if(!Meteor.userId())
		{
			return <div><LoginPanel/></div>;
		}
		else if(!isAdmin)
		{
			return (
			<div>
				<UserPanel user={user}/>
				Vous n avez pas access a cette page
			</div>);
		}
		else
		{
	        return (
	            <div>
	            	<UserPanel user={user}/>
					<PagesEditor 
						pages={this.props.pages}
					/>
	            </div>
	        );
	    }
    }
});

var Layout = React.createClass({
	render: function() {
		return (
			<div className="container">
				<div className="row">
					<div className="span12">
						{this.props.children}
					</div>
				</div>
			</div>
		);

	}
});


var currentPage = null;

function pageRoute(page)
{
	currentPage = Pages.findOne(page);
	return <AppComponent page={currentPage} />;
}
function adminEditPageRoute()
{
	return (
	<Layout>
		<a href={Routes.home()}>view site</a>
		<AdminComponent pages={Pages.find().fetch()} />
	</Layout>);
}


Routes = {};

RouteCore.map(function() {
	Routes.home = this.route('/',function(){
		return pageRoute({slug: 'home'})
	});
	Routes.admin= this.route('/admin', function(){
		return adminEditPageRoute()
	});
	Routes.page = this.route('/:slug',function(ctx){
		return pageRoute({slug: ctx.params.slug})
	});
});

if (Meteor.isServer) {
	//Meteor.users.update({_id:'vDytk4EQe8K52YoiK'}, 
	//	{$set:{"group":"subscriber"}});

	Meteor.publish("pages", function () {
		return Pages.find();
	});

	Meteor.publish("userData", function () {
		if (this.userId) {
			return Meteor.users.find({_id: this.userId},
			                         {fields: {'group': 1}});
		} else {
			this.ready();
		}
	});
	
	Inject.rawModHtml('moveScriptsToBottom', function(html) {
	    // get all scripts
	    var scripts = html.match(/<script type="text\/javascript" src.*"><\/script>\n/g);
	    // remove all scripts
	    html = html.replace(/<script type="text\/javascript" src.*"><\/script>\n/g, '');
	    // add scripts to the bottom
	    return html.replace(/<\/body>/, scripts.join('') + '\n</body>');
	});

	Meteor.startup(function () {
		// code to run on server at startup
		console.log(Pages.find().fetch());
		if (Pages.find().count() === 0) {
        	Pages.insert({content: '<h1>Hello World</h1>'});
        	Pages.insert({content: '<h1>About</h1>'});
        }
        //Pages.update({_id:'Qaui2M6sesHxPnSHp'}, {$addToSet:{slug:'about'}});
        //Pages.update({_id:'N8rffhy5H57gmCtju'}, {$addToSet:{slug:'home'}});
	});
}

if (Meteor.isClient) {
	Meteor.subscribe("pages");
	Meteor.subscribe("userData");


	Meteor.startup(function() {
		
	});
}

