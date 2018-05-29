import React, { Component } from 'react'
import { Button, Form, Input, Icon, Layout, Progress, Col, Row ,Upload} from 'antd'
import $ from '../utils/spider'
const {Sider, Content} = Layout
const FormItem = Form.Item

const ToFormData = (obj)=>{
	let Form = new FormData()
	for(let key in obj){
		Form.append(key, obj[key]==undefined?'NULL':obj[key])
	}
	return Form
}

const CreateBox = (name, param, req, getFieldDecorator) =>{
	return(
		<Row type='flex' style={{alignItems: 'center'}} gutter={16}>
			<Col span={3}><p style={{fontFamily: '\'Roboto\', sans-serif'}}>{name}</p></Col>
			<Col span={18}>
			<FormItem>
				{getFieldDecorator(param, {
					rules: [{ required: req, message: `Please input the ${name}!` }],
				})(
					<Input placeholder={name} style={{width: '300px'}}/>
				)}
			</FormItem>
			</Col>
		</Row>
	)
}

class Inputer extends Component{
	state = {
		uploading: false,
		progress: 0,
		complete: 0,
	}
	constructor(url){
		super()
		this.url = url.url
		console.log(url.url)
	}
	

	handleUpload = (e)=>{
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const Form = ToFormData(values)
				$.Post(`${this.url}/insert`, Form)
				.then(this.setState({
					progress: 100,
				}))
			}
		})
	}

	render(){
		const progress = this.state.progress
		const { getFieldDecorator } = this.props.form

		return(
			<div className='Inputbox' style={{height: '640px', backgroundColor: '#fff'}}>
				<Layout style={{backgroundColor: '#ffffff'}}>
					<Content style={{marginLeft: '5%', width: '40%'}}>
						<Form onSubmit={this.handleUpload} style={{width: '100%'}}>
							{CreateBox('Title', 'name', true, getFieldDecorator)}
							{CreateBox('Author1', 'a1', true, getFieldDecorator)}
							{CreateBox('Author2', 'a2', false, getFieldDecorator)}
							{CreateBox('Author3', 'a3', false, getFieldDecorator)}
							{CreateBox('Key1', 'k1', true, getFieldDecorator)}
							{CreateBox('Key2', 'k2', false, getFieldDecorator)}
							{CreateBox('Key3', 'k3', false, getFieldDecorator)}
							{CreateBox('PublishHouse', 'pub', true, getFieldDecorator)}
							{CreateBox('Description', 'des', false, getFieldDecorator)}
							<Row>
								<FormItem style={{marginTop: '34px'}}>
									<Button type='primary' htmlType='submit' className='input-form-button' style={{width: '300px'}}>
										Upload
									</Button>
								</FormItem>
							</Row>
						</Form>
					</Content>
					
					<Sider style={{width: '300px', backgroundColor: '#ffffff'}}>
						<div style={{backgroundColor: '#ffffff', height: '100%'}}>
							<Progress type='circle' percent={progress}/>
						</div>
					</Sider>
				</Layout>
			</div>
		)
	}
}

export default Form.create()(Inputer)