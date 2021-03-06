import React, { Component } from 'react';
import {
    Icon, Button, Modal
} from 'antd';
import DataTable from "../components/DataTable";
import { Link } from 'react-router-dom'
import API from "../tools/API";




export default class Alumnos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[],
            data2:[],
            loading:true,
            record:{},
            cols:[],
        }
    }

    refreshData = () => {
        this.setState({loading:true});
        API.restCall({
            service:'return_student_list/',
            method: "get",
            params: "",
            success:(response) => {
                this.setState({data: response, loading:false});
            },
            error:(response) => {this.setState({ loading: false });},
        });
    };

    deleteStudent = (rows) =>{
        this.setState({loading:true});
        API.call('eliminar_alumnos/',{alumno:JSON.stringify(rows)},(response) => {
            this.setState({ loading:false});
            this.refreshData();
        },(response) => {this.setState({ loading:false})});
    };

    componentWillMount() {
        this.refreshData();
    }

    showContent = (record) => {
        let data = JSON.parse(record.contenido_subido);
        console.log(data);
        this.setState({cols:data.cols, data2:data.data, visible:true,record:record});
    };

    render() {
        return (
            <div>
                <h1><Icon type="team" /> Alumnos</h1>
                <DataTable loading={this.state.loading} data={this.state.data}
                           deleteFunc={this.deleteStudent} rowSelection={true}
                columns={[{
                    title: 'Nombre del alumno',
                    key: 'nombre',

                }, {
                    title: 'Apellido',
                    key: 'apellido',

                },{
                    title: 'Email',
                    key: 'email',

                }, {
                    title: 'Último Login',
                    key: 'last_login',
                }
                ]}/>

            </div>
        );
    }
}
