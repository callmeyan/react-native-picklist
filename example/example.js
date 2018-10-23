import React from 'react';
import { ScrollView, SafeAreaView, AppRegistry, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PickList, {InnerPickList} from 'react-native-picklist';
import NaviBar from 'react-native-pure-navigation-bar';
import { createStackNavigator } from 'react-navigation';

class TestPage extends React.Component {
    render() {
        const {data, selectedIds, title, isPlainData, isMulti, directBackWhenSingle, showCount, onFinish} = this.props.navigation.state.params;
        return (
            <PickList
                data={data}
                title={title}
                firstTitleLine={'Test'}
                multilevel={!isPlainData}
                multiselect={isMulti}
                directBackWhenSingle={directBackWhenSingle}
                selectedIds={selectedIds}
                showCount={showCount}
                onFinish={onFinish}
                idKey={'code'}
                labelKey={'name'}
                childrenKey={'subitems'}
            />
        );
    }
}

class Example extends React.Component {
    constructor(props) {
        super(props);
        this.plainData = [
            {code: 1, name: '001'},
            {code: 2, name: '002'},
            {code: 3, name: '003'},
            {code: 4, name: '004'},
            {code: 5, name: '005'},
        ];
        this.treeData = [
            {code: 1, name: '101', subitems: [
                {code: 2, name: '002'},
                {code: 3, name: '103', subitems: []},
                {code: 4, name: '104', subitems: [
                    {code: 5, name: '005'},
                    {code: 6, name: '006'},
                ]},
            ]},
            {code: 7, name: '107', subitems: [
                {code: 8, name: '008'},
                {code: 9, name: '009'},
            ]},
            {code: 10, name: '010'},
            {code: 11, name: '011'},
        ];
        this.state = {
            language: 'en',
            key: undefined,
        };
    }

    componentDidMount() {
        this._setLanguage();
    }

    _setLanguage = () => {
        const isEn = this.state.language === 'en';
        InnerPickList.defaultProps.labels.close = isEn ? 'Close' : '关闭';
        InnerPickList.defaultProps.labels.selectAll = isEn ? 'Select All' : '全选';
        InnerPickList.defaultProps.labels.deselectAll = isEn ? 'Deselect All' : '全不选';
        InnerPickList.defaultProps.labels.search = isEn ? 'Search' : '搜索';
        InnerPickList.defaultProps.labels.ok = isEn ? 'OK' : '确定';
        InnerPickList.defaultProps.labels.choose = isEn ? 'Please choose' : '请选择';
    };

    _onFinish = (key, nodeArr) => {
        this.setState({
            [key]: nodeArr.map(node => node.getInfo()),
        });
    };

    _changeLanguage = () => {
        const language = this.state.language === 'en' ? 'zh' : 'en';
        this.setState({language}, () => this._setLanguage());
    };

    test = (state) => {
        const key = 'selectedItems' + state.key;
        const data = state.isPlainData ? this.plainData : this.treeData;
        const selectedIds = (this.state[key] || []).map(item => item.code);
        this.props.navigation.navigate('Test', {
            ...state,
            data,
            selectedIds,
            onFinish: this._onFinish.bind(this, key),
        });
    };

    _renderLanguageItem = () => {
        const isEn = this.state.language === 'en';
        const text = isEn ? 'To Chinese Language' : '转换为英语';
        return (
            <TouchableOpacity style={styles.touch} onPress={this._changeLanguage}>
                <Text style={styles.text}>
                    {text}
                </Text>
            </TouchableOpacity>
        );
    };

    _renderItem = (key, text, onClick) => {
        const innerKey = 'selectedItems' + key;
        if (this.state[innerKey] && this.state[innerKey].length > 0) {
            const names = this.state[innerKey].map(item => item.name);
            text = text + '\n' + names.join(',');
        }
        return (
            <TouchableOpacity style={styles.touch} onPress={onClick}>
                <Text style={styles.text}>
                    {text}
                </Text>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <SafeAreaView
                style={styles.container}
                forceInset={{top: 'never', bottom: 'always', left: 'always', right: 'always'}}
            >
                <NaviBar title={'Test'} leftElement={null} />
                <ScrollView style={{flex: 1}}>
                    {this._renderLanguageItem()}
                    {this._renderItem('a', 'Plain Data + Single Select', () => {
                        this.test({
                            key: 'a',
                            title: 'Plain Single',
                            isPlainData: true,
                            isMulti: false,
                            directBackWhenSingle: false,
                            showCount: false,
                        });
                    })}
                    {this._renderItem('b', 'Plain Data + Single Select + Direct Back', () => {
                        this.test({
                            key: 'b',
                            title: 'Plain Single Back',
                            isPlainData: true,
                            isMulti: false,
                            directBackWhenSingle: true,
                            showCount: false,
                        });
                    })}
                    {this._renderItem('c', 'Plain Data + Multi Select', () => {
                        this.test({
                            key: 'c',
                            title: 'Plain Multi',
                            isPlainData: true,
                            isMulti: true,
                            showCount: false,
                        });
                    })}
                    {this._renderItem('d', 'Tree Data + Single Select', () => {
                        this.test({
                            key: 'd',
                            title: 'Tree Single',
                            isPlainData: false,
                            isMulti: false,
                            directBackWhenSingle: false,
                            showCount: false,
                        });
                    })}
                    {this._renderItem('e', 'Tree Data + Single Select + Direct Back', () => {
                        this.test({
                            key: 'e',
                            title: 'Tree Single Back',
                            isPlainData: false,
                            isMulti: false,
                            directBackWhenSingle: true,
                            showCount: false,
                        });
                    })}
                    {this._renderItem('f', 'Tree Data + Multi Select', () => {
                        this.test({
                            key: 'f',
                            title: 'Tree Multi',
                            isPlainData: false,
                            isMulti: true,
                            showCount: false,
                        });
                    })}
                    {this._renderItem('g', 'Tree Data + Multi Select + Count', () => {
                        this.test({
                            key: 'g',
                            title: 'Tree Multi',
                            isPlainData: false,
                            isMulti: true,
                            showCount: true,
                        });
                    })}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    touch: {
        minHeight: 44,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#e15151',
        borderRadius: 4,
        overflow: 'hidden',
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        paddingVertical: 10,
        textAlignVertical: 'center',
        textAlign: 'center',
        color: 'white',
    },
});

const navigator = createStackNavigator({
    Example: {screen: Example},
    Test: {screen: TestPage},
}, {
    headerMode: 'none',
});

AppRegistry.registerComponent('test', () => navigator);