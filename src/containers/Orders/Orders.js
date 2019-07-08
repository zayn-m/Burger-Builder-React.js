import React,{Component} from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axios.get('/orders.json')
                .then(res => {
                    //console.log(res.data);
                    // convert object to array
                    const fetchedOrders = [];
                    for (let key in res.data) {
                        fetchedOrders.push({
                            // push new object to fetchedOrders array as it distributes properties of object from firebase
                            ...res.data[key],
                            id: key
                            
                        });
                    }
                    this.setState({loading: false, orders: fetchedOrders});
                    console.log(this.state.orders);
                })
                .catch(error => {
                    this.setState({loading: false});
                })
    }

    render () {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id}
                            ingredients={order.ingredients}
                            totalPrice={order.totalPrice}/>
                ))}
            </div>

        );
    }
}

export default withErrorHandler(Orders, axios) ;