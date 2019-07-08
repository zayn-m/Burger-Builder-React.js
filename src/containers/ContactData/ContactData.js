import React, {Component} from 'react';

import Button from '../../components/UI/Button/Button';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';

class ContactData extends Component {
    state = {

        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'zip code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'your e-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', displayValue: 'Fastest'},
                                {value: 'cheapest', displayValue: 'Cheapest'}]
                },
                value: '',
                validation: {},
                valid: true
            }
        },

        formIsValid: false,
        
        loading: false

    };

    orderData = (event) => {
        // this will prevent form to send request to server
        event.preventDefault();
        console.log(this.props);

        this.setState({loading: true});

        // get data from state
        const formData = {};
        for (let el in this.state.orderForm) {
            formData[el] = this.state.orderForm[el].value;
            console.log('[formData] ' + formData[el]);
        }

        const order = {
            ingredients: this.props.ingredients,
            // on real app recalculate price before sending to server
            totalPrice: this.props.totalPrice,
            orderData: formData

        };
        axios.post('/orders.json', order)
                .then(response =>{
                    console.log(response);
                    this.setState({loading: false});
                    // redirect to home page
                    this.props.history.replace('/');
                })
                .catch(error =>{
                    console.log(error);
                    this.setState({loading: false});
                });
    }

    // inputIdentifier -> reach out our state and get the right object and adjust its value
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;

        // update valid property of updatedFormElement
        updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;

        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        // check all inputs
        for (let input in updatedOrderForm) {
            formIsValid = updatedOrderForm[input].valid && formIsValid;
        }


        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    checkValidation = (value, rules) => {
        let isValid = true;

        // check if rules has required property - Validation: { required: true}
        if (rules.required) {
            // return isValid true if value.trim() is not equals to ''
            isValid = value.trim() !== '' && isValid;
        }

        // check zip code length
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    render() {

        const formElementArray = [];
        
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
    
        let form = (
            <form className='ContactData' onSubmit={this.orderData}>
                <h4>Enter your contact data</h4>
                {formElementArray.map(el => (
                    <Input key={el.id}
                            elementType={el.config.elementType} 
                            elementConfig={el.config.elementConfig}
                            value={el.config.value}
                            invalid={!el.config.valid}
                            shouldValidate={el.config.validation}
                            touched={el.config.touched}
                            changed={(event) => this.inputChangedHandler(event, el.id)} />
                ))}
                <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
            );

        if (this.state.loading) {
            form = <Spinner />
        }

        return(

            <div>
                {form}
            </div>
        );
    }
}

export default ContactData;