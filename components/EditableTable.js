import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Input } from 'antd'
import Immutable from 'immutable';
class EditableTable extends PureComponent {
    constructor(props){
        super(props);
        this.state={}
    }

    handleChange(index,e){
        const { value, onChange } = this.props
        const newValue = [...value]
        newValue[index] = e.target.value
        console.log(newValue)
        onChange(newValue)
    }

    handleDelete(e){
        const target = e.currentTarget
        const index = target.parentNode.parentNode.firstChild.dataset.index
        const { value, onChange } = this.props
        const newValue = [...value]
        newValue.splice(Number(index), 1)
        onChange(newValue)
    }

    handleAdd(){
        const { value, onChange } = this.props
        const newValue = [...value, '']
        onChange(newValue)
    }

    render(){
        //测试 开始
        //console.log(this.props)
        var map=Immutable.fromJS(this.props).delete('value');
        var properties = map.toObject();
        const { value} = this.props;
        // var copy = Object.assign({}, this.props);
        // delete copy.value;
        const closeBtn = <Icon type="close-circle" onClick={this.handleDelete.bind(this)} />
        return (
            <div className="input-array-component">
                {value.map((v, i) => {
                    return (
                        <div key={i}>
                            <Input
                                {...properties}
                                value={v}
                                suffix={closeBtn}
                                data-index={i}
                                onChange={this.handleChange.bind(this,i)}
                            />
                        </div>
                    );
                })}
                <div>
                     <Button type="dashed" icon="plus"  onClick={this.handleAdd.bind(this)}>添加</Button>
                </div>
            </div>
        );
    }
}

EditableTable.defaultProps = {
    value: []
}

export default EditableTable