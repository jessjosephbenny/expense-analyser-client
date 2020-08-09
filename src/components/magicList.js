import React from 'react'
import { Avatar } from 'evergreen-ui'
import { Text } from '@blueprintjs/core'
import { show } from '@blueprintjs/core/lib/esm/components/context-menu/contextMenu';

class MagicList extends React.Component {
    state = {
        showData: []
    }
    // componentDidUpdate() {
    //     const { showData } = this.state;
    //     if(showData!=this.props.data) {
    //         if (this.props.data.length) {
    //             this.setState({
    //                 showData: this.props.data.slice(0, 30)
    //             })
    //         }
    //     }
    // }
    
    static getDerivedStateFromProps(nextProps, prevState){
        if(!prevState.showData.length){
            if(nextProps.data.length){
                return{
                    ...prevState,
                    showData: nextProps.data.slice(0,30)
                }
            }
        }
        console.log('JSON Compare....',JSON.stringify(nextProps.data.slice(0,prevState.showData.length)) == JSON.stringify(prevState.showData))
        if(JSON.stringify(nextProps.data.slice(0,prevState.showData.length)) != JSON.stringify(prevState.showData))
        return{
            ...prevState,
            showData: nextProps.data.slice(0,30)
        }
    }
    fetchMoreData = () => {
        const { showData } = this.state;
        console.log(this.props.data);
        this.setState({
            showData: [...showData, ...this.props.data.slice(showData.length, showData.length + 30)]
        })
    }
    handleScroll = (event) => {
        const { target } = event;
        if (target.scrollTop + target.offsetHeight < target.scrollHeight-300)
            return;
        this.fetchMoreData();

    }
    render() {
        const { showData } = this.state;
        let lastDate = new Date()
        console.log(showData);
        return (
            <div className="magic-list mostly-customized-scrollbar" style={{ height: 928 }} onScroll={this.handleScroll}>
                {
                    showData.map(tdata => {
                        const date = new Date(parseInt(tdata.tDate.split('-')[0]),parseInt(tdata.tDate.split('-')[1])-1,parseInt(tdata.tDate.split('-')[2]));
                        const Item =(<>{lastDate.getTime()!==date.getTime()?
                        <Text className="mt-2 mb-2">{`${date.getDate()} ${date.toDateString().split(' ')[1]} ${date.getFullYear()}`}</Text>:null}
                        <MagicListItem
                            keyword={tdata.keyword == null ? 'Other' : tdata.keyword}
                            category={tdata.keyword == null ? tdata.narration : tdata.category}
                            amount={tdata.depositAmount > 0 ? `+₹${tdata.depositAmount}` : `-₹${tdata.withdrawalAmount}`} /></>)
                        lastDate = date;
                        return Item
                    }) 
                }
            </div>
        )
    }
}
export default MagicList

function MagicListItem(props) {
    const { keyword, category, amount } = props
    return (
        <div className="magic-list-item">
            <div className="d-flex" style={{ height: 56 }}>
                <div style={{ marginTop: 4 }}>
                    <Avatar name={keyword} size={48} />
                </div>
                <div className="d-flex flex-column" style={{ marginLeft: 16, width: '65%' }}>
                    <div style={{ fontSize: 'larger', fontWeight: 600 }}>
                        <Text>{keyword}</Text>
                    </div>
                    <div style={{ fontSize: 'large' }}>
                        <Text ellipsize={true}>{category}</Text>
                    </div>
                </div>
                <div className="ml-auto" style={{ marginTop: 14, marginRight: 16 }}>
                    <Text>{amount}</Text>
                </div>
            </div>
        </div>
    )
}