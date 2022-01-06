<template>
    <div class="rcp-el-feature-select">
        <div class="rcp-el-feature-select-title">
            {{ needSelectedTitle }}
        </div>
        <div class="rcp-el-feature-select-content">
            <div class="rcp-el-feature-select-tab">
                <ks-tabs
                    v-model="featureType"
                    type="senior"
                    size="mini"
                    :offset="16"
                    @tab-click="changeFeatureType"
                >
                    <ks-tab-pane
                        v-for="item in featureListType"
                        :label="item.label"
                        :name="item.value"
                        :key="item.value"
                    >
                    </ks-tab-pane>
                </ks-tabs>
            </div>
            <div class="rcp-el-feature-select-filter">
                <ks-input
                    v-model="searchValue"
                    placeholder="请输入特性名"
                ></ks-input>
            </div>
            <div class="rcp-el-feature-select-list">
                <ks-checkbox-group
                    v-model="localSelected"
                    :max="max"
                    @change="handleLocalSelectedChange"
                >
                    <ks-checkbox
                        v-for="item in allFeatureList"
                        :key="item.featureKey"
                        :label="item.featureKey"
                    >
                        {{ formatFeatureLabel(item.featureKey) }}
                    </ks-checkbox>
                </ks-checkbox-group>
                <p class="rcp-el-feature-select-more" ref="loadRef">
                    {{ loadMore ? '加载中...' : '没有更多了' }}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DraggerAble from 'vuedraggable';
import { getFeatureList } from './service';
import { IFeatureItem, IPaginationInfo } from './const';
import { debounce } from 'lodash';
import { namespace } from 'vuex-class';
import { StoreModule } from '@/store/const';

const KCONFSTORE = namespace(StoreModule.KCONF);

type IFeatureMap = Map<string, IFeatureItem>

enum IFeatureType {
    ALL = 'all',
    FAVORITE_ONLY = 'favoriteOnly',
    SHOW_ME_ONLY = 'showMeOnly',
}

@Component({
    name: 'feature-select',
    components: {
        DraggerAble,
    },
})
export default class FeatureSelect extends Vue {

    featureListType = [
        {
            label: '全部特征',
            value: 'all',
        },
        {
            label: '我的收藏',
            value: 'favoriteOnly',
        },
        {
            label: '我的创建',
            value: 'showMeOnly',
        },
    ];

    searchValue = '';

    localSelected: string[] = [];

    allFeatureList: any[] = [];

    loadMore = true;

    page = 0;

    count = 50;

    isFilter = false;

    featureMap: Map<IFeatureType, IFeatureMap> = new Map(
        [
            [ IFeatureType.ALL, new Map() ],
            [ IFeatureType.FAVORITE_ONLY, new Map() ],
            [ IFeatureType.SHOW_ME_ONLY, new Map() ],
        ],
    );

    featureType: IFeatureType = IFeatureType.ALL;

    io: IntersectionObserver | null = null;

    @KCONFSTORE.State(state => state.featureMap)
    readonly originFeatureMap!: string;

    @Prop({
        type: Array,
        default: () => [],
    })
    readonly selected!: IFeatureItem[];

    @Prop({
        type: String,
        default: '待选字段',
    })
    readonly needSelectedTitle!: string;

    @Prop({
        type: Function,
        required: true,
    })
    readonly formateLabel!: (feature?: IFeatureItem) => string;

    @Prop({
        type: Number,
        default: undefined,
    })
    readonly max!: number;

    @Prop({
        type: Function,
        default: undefined,
    })
    readonly fetchList!: (payload: any) => {records: IFeatureItem[], pagination: IPaginationInfo};

    @Watch('selected', {
        immediate: true,
        deep: true,
    })
    handleSelectedChange(list: IFeatureItem[]) {
        if (list) {
            this.localSelected = list.map(item => item.featureKey);
            if (this.featureType === IFeatureType.ALL) {
                this.setFeatureList(list);
            } else {
                const featureMap = this.featureMap.get(this.featureType);
                list.forEach(item => {
                    const { featureKey, featureName } = item;
                    const featureMap = this.featureMap.get(this.featureType);
                    if (featureMap && !featureMap.has(featureKey)) {
                        featureMap.set(featureKey, item);
                    }
                    this.featureMap.get(IFeatureType.ALL)?.set(featureKey, item);
                });
            }
        }
    }

    setFeatureList(list: IFeatureItem[]) {
        if (!list) {
            return;
        }
        const featureMap = this.featureMap.get(this.featureType);
        if (featureMap!.size !== this.allFeatureList.length) {
            list.forEach(item => {
                const { featureKey, featureName } = item;
                featureMap!.set(featureKey, item);
            });
            this.allFeatureList = [ ...(featureMap || []) ].map(item => {
                const [ _, option ] = item;
                return {
                    ...option,
                };
            });
            return;
        }

        list.forEach(item => {
            const { featureKey, featureName } = item;
            if (featureMap && !featureMap.has(featureKey)) {
                this.allFeatureList.push({ featureKey, featureName });
                featureMap.set(featureKey, item);
            }
            this.featureMap.get(IFeatureType.ALL)?.set(featureKey, item);
        });


        // 是否可以不用判断，每次默认就从featureMap取值？
        // const featureMap = this.featureMap.get(this.featureType);
        // list.forEach(item => {
        //     const { featureKey, featureName } = item;
        //     featureMap!.set(featureKey, item);
        //     this.featureMap.get(IFeatureType.ALL)?.set(featureKey, item)
        // })
        // this.allFeatureList = [ ...(featureMap || []) ].map(item => {
        //     const [ _, option ] = item;
        //     return {
        //         ...option,
        //     };
        // });
    }

    @Watch('searchValue')
    handleResetData() {
        this.page = 0;
        this.allFeatureList = [];
        // const featureMap = this.featureMap.get(this.featureType);
        // featureMap?.clear();
        this.load();
    }

    formatFeatureLabel(featureKey: string) {
        const featureMap = this.featureMap.get(IFeatureType.ALL);
        const feature = featureMap?.get(featureKey);
        return this.formateLabel(feature);
    }

    formatFeatureOption(featureKey: string) {
        const featureMap = this.featureMap.get(IFeatureType.ALL);
        const feature = featureMap?.get(featureKey);
        let featureName;
        if (feature) {
            featureName = feature.featureName;
        }
        return {
            featureKey, featureName,
        };
    }

    async fetchFeatureList() {
        const fetchFun = typeof this.fetchList === 'function' ? this.fetchList : getFeatureList;
        const data = await fetchFun({
            page: this.page,
            size: this.count,
            favoriteOnly: this.featureType === 'favoriteOnly',
            showMeOnly: this.featureType === 'showMeOnly',
            globalSearch: this.searchValue,
        });
        return data.records;
    }

    async load() {
        this.page = this.page + 1;
        this.loadMore = true;
        const list = await this.fetchFeatureList();
        if (list.length) {
            this.setFeatureList(list);
        }
        this.loadMore = false;
    }

    changeFeatureType() {
        this.handleResetData();
    }

    handleLocalSelectedChange(list: string[]) {
        const featureMap = list.map(item => this.formatFeatureOption(item));
        this.$emit('change', featureMap);
    }

    intersectionHandler(entry: IntersectionObserverEntry[]) {
        if (entry.some(entry => entry.isIntersecting || entry.intersectionRatio)) {
            this.load();
        }
    }

    unRegisterInterSection() {
        this.io?.disconnect();
    }

    created() {
        this.load = debounce(this.load, 200) as any;
    }

    mounted() {
        this.$nextTick(() => {
            this.io = this.io || new window.IntersectionObserver(entries => this.intersectionHandler(entries), {
                root: this.$el,
                threshold: Number.MIN_VALUE,
            });
            if (this.$refs.loadRef) {
                this.io.observe(this.$refs.loadRef as Element);
            }
        });
    }

    beforeDestroy() {
        this.unRegisterInterSection();
    }

}
</script>

<style lang="less" scoped>
.rcp-el-feature-select {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: 30vh;

    &-filter {
        display: flex;
        width: 100%;
        margin-top: 12px;
    }

    &-list {
        margin-top: 12px;
        flex: 1;
        overflow-y: auto;
    }

    &-more {
        text-align: center;
    }
}
</style>
