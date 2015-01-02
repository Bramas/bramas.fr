
WysiwygPageEditor = React.createClass({
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
		state.page.content = this.refs.editor.getDOMNode().innerHTML;

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
		if(!this.state.page)
		{
			return <div>loading...</div>;
		}

		return <div className={this.props.className+" page-editor"}>
			<div id={this.state.page._id+'-toolbar'} ref="toolbar">
				<span className="btn-group">
					<a className="btn fa fa-bold" data-wysihtml5-command="bold" title="CTRL+B"></a>
					<a className="btn fa fa-italic" data-wysihtml5-command="italic" title="CTRL+I"></a>
				</span>
				<span className="btn-group">
					<a className="btn fa fa-superscript" data-wysihtml5-command="superscript" title="sup"></a>
					<a className="btn fa fa-subscript" data-wysihtml5-command="subscript" title="sub"></a>
				</span>
				<span className="btn-group">
					<a className="btn fa fa-chain" data-wysihtml5-command="createLink"></a>
					<a className="btn fa fa-unlink" data-wysihtml5-command="removeLink"><s></s></a>
				</span>
				<a data-wysihtml5-command="insertImage">insert image</a> |
				<a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h1">h1</a> |
				<a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h2">h2</a> |
				<a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="p">normal</a> |
				
				<span className="btn-group">
					<a className="btn fa fa-list-ul" data-wysihtml5-command="insertUnorderedList"></a>
					<a className="btn fa fa-list-ol" data-wysihtml5-command="insertOrderedList"></a>
				</span> |
    <a data-wysihtml5-command="foreColor" data-wysihtml5-command-value="red">red</a> |
    <a data-wysihtml5-command="foreColor" data-wysihtml5-command-value="green">green</a> |
    <a data-wysihtml5-command="foreColor" data-wysihtml5-command-value="blue">blue</a> |

				<span className="btn-group">
					<a className="btn fa fa-undo" data-wysihtml5-command="undo"></a>
					<a className="btn fa fa-repeat" data-wysihtml5-command="redo"></a>
				</span>

			    <div className="toolbar-dialog" data-wysihtml5-dialog="createLink" style={{display: 'none'}}>
			      <label>
			        Link:
			        <input data-wysihtml5-dialog-field="href" defaultValue="http://" />
			      </label>
			      <a data-wysihtml5-dialog-action="save">OK</a>&nbsp;<a data-wysihtml5-dialog-action="cancel">Cancel</a>
			    </div>
			    
			    <div className="toolbar-dialog" data-wysihtml5-dialog="insertImage" style={{display: 'none'}}>
			      <label>
			        Image:
			        <input data-wysihtml5-dialog-field="src" defaultValue="http://" />
			      </label>
			      <label>
			        Align:
			        <select data-wysihtml5-dialog-field="className">
			          <option value="">default</option>
			          <option value="wysiwyg-float-left">left</option>
			          <option value="wysiwyg-float-right">right</option>
			        </select>
			      </label>
			      <a data-wysihtml5-dialog-action="save">OK</a>&nbsp;<a data-wysihtml5-dialog-action="cancel">Cancel</a>
			    </div>
			</div>
			<div className="wysiwy-editor-wrapper">
				<div 
					ref="editor"
					dangerouslySetInnerHTML={{__html:this.state.page.content}}>
				</div>
			</div>
		</div>;
	},
	componentDidMount: function(){
		if(!this.refs.editor)
		{
			return;
		}
		console.log('componentDidUpdate');
		this.editor = new wysihtml5.Editor(this.refs.editor.getDOMNode(), {
			toolbar: this.state.page._id+'-toolbar',
			parserRules:  wysihtml5ParserRules
		});
		this.editor.on("change", this.handleChange);
	}
});