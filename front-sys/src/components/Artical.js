import React, { Component } from 'react'
import { Popover, Button, Form, Input, Icon, Layout, Progress, Col, Row ,Upload} from 'antd'
import $ from '../utils/spider'
const {Sider, Content, Footer} = Layout
const FormItem = Form.Item

const ToFormData = (obj)=>{
	let Form = new FormData()
	for(let key in obj){
		Form.append(key, obj[key]==undefined?'':obj[key])
	}
	return Form
}

class Artical extends Component{
	state = {
		List: [],
	}
	constructor(url){
		super()
		this.url = url.url
		$.Get(`${this.url}/list`).then((res)=>{
			this.setState({
				List: res.data
			})
		})
	}

	handleFilter = (e)=>{
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const Form = ToFormData(values)
				$.Post(`${this.url}/filter`, Form)
				.then((res)=>{
					console.log(res)
					this.setState({
						List: res.data
					})
				})
			}
		})
	}

	handleDelete = (name)=>{
		$.Get(`${this.url}/delete?name=${name}`).then((res)=>{
			this.setState(({List})=>{
				const index = List.indexOf(name)
				const newList = List.slice()
				newList.splice(index, 1)
				return {
					List: newList,
				}
			})	
		})
	}

	CreateBox = (data) =>{
		return(
			<Row style={{alignItems: 'center', marginLeft: {xs: 2, sm: 4, md: 6, lg: 8}}} gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
				<Popover content={data.des} title='Description'>
					<Col span={2}><p style={{fontFamily: '\'Roboto\', sans-serif'}}>{data.name=='NULL'?'':data.name}</p></Col>
					<Col span={2}><p style={{fontFamily: '\'Roboto\', sans-serif'}}>{data.a1=='NULL'?'':data.a1}</p></Col>
					<Col span={2}><p style={{fontFamily: '\'Roboto\', sans-serif'}}>{data.a2=='NULL'?'':data.a2}</p></Col>
					<Col span={2}><p style={{fontFamily: '\'Roboto\', sans-serif'}}>{data.a3=='NULL'?'':data.a3}</p></Col>
					<Col span={2}><p style={{fontFamily: '\'Roboto\', sans-serif'}}>{data.k1=='NULL'?'':data.k1}</p></Col>
					<Col span={2}><p style={{fontFamily: '\'Roboto\', sans-serif'}}>{data.k2=='NULL'?'':data.k2}</p></Col>
					<Col span={2}><p style={{fontFamily: '\'Roboto\', sans-serif'}}>{data.k3=='NULL'?'':data.k3}</p></Col>
					<Col span={2}><p style={{fontFamily: '\'Roboto\', sans-serif'}}>{data.pub=='NULL'?'':data.pub}</p></Col>
					<Col span={2}>
						<Button type='primary' className='login-form-button' style={{width: '80px'}} onClick={()=>this.handleDelete(data.name)}>
							Delete
						</Button>
					</Col>
				</Popover>
			</Row>
		)
	}
	
	CreateFilt = (getFieldDecorator, param) =>{
		return(
			<Col>
				<Col span={1}><p style={{fontFamily: '\'Roboto\', sans-serif'}}>{param}</p></Col>
				<Col span={5}>
					<FormItem>
						{getFieldDecorator(param, {
							rules: [{ required: false}],
						})(
							<Input placeholder='' style={{width: '200px'}}/>
						)}
					</FormItem>
				</Col>
			</Col>
		)
	}
	render(){
		const { getFieldDecorator } = this.props.form

		return(
			<div className='Inputbox' style={{height: '640px', backgroundColor: '#fff'}}>
				<Layout style={{backgroundColor: '#ffffff'}}>
					<Content style={{marginLeft: '5%', width: '100%'}}>
						<Row style={{alignItems: 'center'}} gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
							<Col span={2}><p style={{fontFamily: '\'Roboto\', sans-serif'}}>name</p></Col>
							<Col span={2}><p style={{fontFamily: '\'Roboto\', sans-serif'}}>author1</p></Col>
							<Col span={2}><p style={{fontFamily: '\'Roboto\', sans-serif'}}>author2</p></Col>
							<Col span={2}><p style={{fontFamily: '\'Roboto\', sans-serif'}}>author3</p></Col>
							<Col span={2}><p style={{fontFamily: '\'Roboto\', sans-serif'}}>key1</p></Col>
							<Col span={2}><p style={{fontFamily: '\'Roboto\', sans-serif'}}>key2</p></Col>
							<Col span={2}><p style={{fontFamily: '\'Roboto\', sans-serif'}}>key3</p></Col>
							<Col span={2}><p style={{fontFamily: '\'Roboto\', sans-serif'}}>pub</p></Col>
						</Row>
						{this.state.List.map(data=>this.CreateBox(data))}
					</Content>
					<Footer style={{backgroundColor: '#fff'}}>
						<Form onSubmit={this.handleFilter} style={{width: '100%'}}>
							<Row>
								{this.CreateFilt(getFieldDecorator, 'name')}
								{this.CreateFilt(getFieldDecorator, 'a1')}
								{this.CreateFilt(getFieldDecorator, 'a2')}
								{this.CreateFilt(getFieldDecorator, 'a3')}
							</Row>
							<Row>
								{this.CreateFilt(getFieldDecorator, 'pub')}
								{this.CreateFilt(getFieldDecorator, 'k1')}
								{this.CreateFilt(getFieldDecorator, 'k2')}
								{this.CreateFilt(getFieldDecorator, 'k3')}
							</Row>
							<Row>
								<FormItem style={{marginTop: '34px'}}>
									<Button type='primary' htmlType='submit' className='input-form-button' style={{width: '80px'}}>
										Filter
									</Button>
								</FormItem>
							</Row>
						</Form>
					</Footer>
				</Layout>
			</div>
		)
	}
}

export default Form.create()(Artical)