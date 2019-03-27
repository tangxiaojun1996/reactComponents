import React from 'react';

export default class TxtDraggableTextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textareaValue: '',
    };
    this.txtDraggableTextarea = React.createRef();
  }

  componentDidMount(){
    const { defaultValue } = this.props;
    if (defaultValue) this.setState({ textareaValue: defaultValue });
  }

  textareaChange = (e) => {
    e.preventDefault();
    this.setState({ textareaValue: e.target.value || '' })
  };

  onDrop = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const fileList = Array.from(e.dataTransfer.files);

    if (fileList && fileList[0]) {
      reader.readAsText(fileList[0], 'gb2312');
    }

    reader.onload = e => {
      const { textareaValue } = this.state;
      if (e.target.result) {
        this.setState({ textareaValue: `${textareaValue}\r\n${e.target.result}`});
      }
      this.txtDraggableTextarea.current.focus(); // 焦点给予到文本域
    };
  };

  onDragOver = e => {
    e.preventDefault();
  };

  render() {
    const { textareaValue } = this.state;
    const { style } = this.props;

    return (
        <textarea
          ref={this.txtDraggableTextarea}
          value={textareaValue}
          onChange={this.textareaChange}
          onDragOver={this.onDragOver}
          onDrop={this.onDrop}
          style={{width: '100%', height: '100%', ...style}}
        />
    )
  }
}

