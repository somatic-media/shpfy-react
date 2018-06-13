import React, {Component} from 'react';
import { Dropdown } from 'semantic-ui-react';

class VariantSelector extends Component {
  render() {
    return (
      <select
        className="Product__option"
        name={this.props.option.name}
        key={this.props.option.name}
        onChange={this.props.handleOptionChange}
      >
        {this.props.option.values.map((value) => {
          return (
            <Dropdown value={value} options={`${this.props.option.name}-${value}`} />
          )
        })}
      </select>
    );
  }
}

export default VariantSelector;
