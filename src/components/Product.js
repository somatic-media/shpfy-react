import React, {Component} from 'react';
import VariantSelector from './VariantSelector';
import { Card, Icon, Image } from 'semantic-ui-react';

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.findImage = this.findImage.bind(this);
  }

  componentWillMount() {
    this.props.product.options.forEach((selector) => {
      this.setState({
        selectedOptions: { [selector.name]: selector.values[0].value }
      });
    });
  }

  findImage(images, variantId) {
    const primary = images[0];

    const image = images.filter(function (image) {
      return image.variant_ids.includes(variantId);
    })[0];

    return (image || primary).src;
  }

  handleOptionChange(event) {
    const target = event.target
    let selectedOptions = this.state.selectedOptions;
    selectedOptions[target.name] = target.value;

    const selectedVariant = this.props.product.variants.find((variant) => {
      return variant.selectedOptions.every((selectedOption) => {
        return selectedOptions[selectedOption.name] === selectedOption.value.valueOf();
      });
    });

    this.setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.attrs.image.src
    });
  }

  handleQuantityChange(event) {
    this.setState({
      selectedVariantQuantity: event.target.value
    });
  }

  render() {
    let variantImage = this.state.selectedVariantImage || this.props.product.images[0].src
    let variant = this.state.selectedVariant || this.props.product.variants[0]
    let variantQuantity = this.state.selectedVariantQuantity || 1
    let variantSelectors = this.props.product.options.map((option) => {
      return (
        <VariantSelector
          handleOptionChange={this.handleOptionChange}
          key={option.id.toString()}
          option={option}
        />
      );
    });
    return <div className="Product">
        <Card>
        {this.props.product.images.length ? <Image src={variantImage} alt={`${this.props.product.title} product shot`} /> : null}
          <Card.Content>
            <Card.Header>{this.props.product.title}</Card.Header>
            <Card.Meta>
              <span className="date Product__price">${variant.price}</span>
            </Card.Meta>
            <Card.Description>
            {variantSelectors}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
          <label className="Product__option">
          Quantity
          <input min="1" type="number" defaultValue={variantQuantity} onChange={this.handleQuantityChange} />
        </label>
            <Icon name="user" />
            <button className="Product__buy button" onClick={() => this.props.addVariantToCart(variant.id, variantQuantity)}>
              Add to Cart
        </button>
          </Card.Content>
        </Card>
      </div>;
  }
}

export default Product;
