import PropTypes from 'prop-types';

export default {
    // Required
    title: PropTypes.string.isRequired,
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    navigation: PropTypes.object.isRequired,
    // Optional
    firstTitleLine: PropTypes.string,
    isCascade: PropTypes.bool,
    multilevel: PropTypes.bool,
    multiselect: PropTypes.bool,
    onFinish: PropTypes.func,
    rightTitle: PropTypes.string,
    rightClick: PropTypes.func,
    renderRow: PropTypes.func,
    renderHeader: PropTypes.func,
    showBottomView: PropTypes.bool,
    showSearchView: PropTypes.bool,
    showTitleLine: PropTypes.bool,
    showAllCell: PropTypes.bool,
    showCount: PropTypes.bool,
    numberOfTextLines: PropTypes.number,
    directBackWhenSingle: PropTypes.bool,
    cancelableWhenDirectBack: PropTypes.bool,
    selectedIds: PropTypes.array,
    selectable: PropTypes.func,
    childrenKey: PropTypes.string,
    idKey: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    labelKey: PropTypes.string,
    searchKeys: PropTypes.array,
    sort: PropTypes.func,
    split: PropTypes.func,
    flatListProps: PropTypes.object,
    sectionListProps: PropTypes.object,
    searchListProps: PropTypes.object,
    buttonProps: PropTypes.object,
    labels: PropTypes.shape({
        close: PropTypes.string,
        search: PropTypes.string,
        selectAll: PropTypes.string,
        deselectAll: PropTypes.string,
        ok: PropTypes.string,
        choose: PropTypes.string,
        cancel: PropTypes.string,
    }),
    renderSingleSelectIcon: PropTypes.func,
    renderMultiSelectIcon: PropTypes.func,
};