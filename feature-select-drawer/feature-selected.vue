<template>
    <div class="rcp-el-feature-selected">
        <div class="rcp-el-feature-select-title">
            {{ selectedTitle }}
            <span
                v-if="showSelected"
                class="rcp-el-feature-selected-info"
            >
                {{ localSelected.length }}/10
            </span>
        </div>
        <div class="rcp-el-feature-select-content">
            <DraggerAble
                v-model="localSelected"
                class="rcp-el-feature-selected-list"
                group="result"
                @start="handleDragStart"
                @end="handleDragEnd"
                @mouseleave.native="activeIndex = -1"
            >
                <div
                    v-for="(feature, index) in localSelected"
                    :key="feature.featureKey"
                    :class="[
                        'rcp-el-feature-selected-item',
                        activeIndex === index && 'rcp-el-feature-selected-item-hover'
                    ]"
                    @mouseenter="handleMouseEnter(index)"
                >
                    <div class="rcp-el-feature-selected-prepend">
                        <i class="rcp-icon-drag"></i>
                    </div>
                    <div class="rcp-el-feature-selected-content">
                        {{ formatFeatureLabel(feature) }}
                    </div>
                    <div class="rcp-el-feature-selected-append" @click="handleRemove(index)">
                        移除
                    </div>
                </div>
            </DraggerAble>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DraggerAble from 'vuedraggable';
import { IFeatureItem } from './const';
import { cloneDeep } from 'lodash';

@Component({
    name: 'feature-selected',
    components: {
        DraggerAble,
    },

})
export default class FeatureSelected extends Vue {

    dragging = false;

    activeIndex = -1;

    localSelected: IFeatureItem[] = [];

    @Prop({
        type: Array,
        default: () => [],
    })
    readonly selected!: IFeatureItem[];

    @Prop({
        type: String,
        default: '已选字段',
    })
    readonly selectedTitle!: string;

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

    get showSelected() {
        return typeof this.max !== 'undefined';
    }

    @Watch('selected', {
        immediate: true,
    })
    handleLocalSelectedChange(list: IFeatureItem[]) {
        if (list) {
            this.localSelected = cloneDeep(list);
        }
    }

    formatFeatureLabel(feature: IFeatureItem) {
        return this.formateLabel(feature);
    }

    handleDragStart() {
        this.activeIndex = -1;
        this.dragging = true;
    }

    handleDragEnd(e: any) {
        this.activeIndex = e.newIndex;
        this.dragging = false;
        this.$emit('change', this.localSelected);
    }

    handleMouseEnter(index: number) {
        if (this.dragging) {
            return;
        }
        this.activeIndex = index;
    }

    handleRemove(index: number) {
        this.localSelected.splice(index, 1);
        this.$emit('change', this.localSelected);
    }

}
</script>

<style lang="less" scoped>
.rcp-el-feature-selected {
    font-size: 12px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 376px;
    &-info {
        color: #326afa;
    }

    &-prepend {
        margin-right: 4px;
    }

    &-item {
        height: 32px;
        line-height: 32px;
        display: flex;
        flex-direction: row;
        padding-right: 40px;
        border-radius: 4px;
        position: relative;
        cursor: grab;

        &-hover {
            background: rgba(50, 125, 255, 0.12);
            .rcp-icon-drag {
                color: #326afa;
            }
            .rcp-el-feature-selected-append {
                display: block;
            }
        }
    }

    &-content {
        color: #575859;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        white-space: nowrap;
    }

    &-append {
        position: absolute;
        top: 0;
        right: 8px;
        color: #326afa;
        cursor: pointer;
        display: none;
    }
}
</style>
