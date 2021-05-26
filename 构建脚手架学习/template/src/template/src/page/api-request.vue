<template lang="pug">
.request
    p.title request
</template>

<script>
import { rModel, appApi } from 'IO';

export default {
    name: 'home',
    beforeMount() {
        // 访问多个接口
        rModel
            .chain()
            .then(data => {
                return rModel.commitAll([
                    rModel.commitWrap('login/getUserInfo', {}),
                    rModel.commitWrap('other/getEnums', {
                        params: {
                            names: 'gender,public_clue_status_form,follow_state,clue_source,clue_type,clue_state,clue_invalid_state',
                        },
                    }),
                    // rModel.commitWrap('setting/getUserSettings', {}),
                ]);
            })
            .finish(data => {
                console.log('success', data);
            })
            .catch(data => {
                console.log('fail', data);
            });
        // api访问
        appApi.login.getUserInfo({}, (data) => {
            console.log('api success api', data);
        }, (data) => {
            console.log('api fail api', data);
        }, (data) => {
            const newData = {
                match: data,
            };
            console.log('api macth data', newData);
            return newData;
        });
        // 访问单个接口
        rModel
            .chain()
            .commit('login/getUserInfo', {}, (data) => {
                const newData = {
                    match: data,
                };
                console.log('rModel macth data', newData);
                return newData;
            })
            .finish(data => {
                console.log('rModel success', data);
            })
            .catch(data => {
                console.log('rModel fail', data);
            });
        // 访问单个接口
        appApi.other.getEnums({
            params: {
                names: 'gender,public_clue_status_form,follow_state,clue_source,clue_type,clue_state,clue_invalid_state',
            },
        }, (data) => {
            console.log('success enums api', data);
        }, (data) => {
            console.log('fail enums api', data);
        });
    },
};
</script>
