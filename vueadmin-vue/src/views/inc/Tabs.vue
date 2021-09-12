<template>
	<el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="clickTab">
		<el-tab-pane
				v-for="(item, index) in editableTabs"
				:key="item.name"
				:label="item.title"
				:name="item.name"
		>

		</el-tab-pane>
	</el-tabs>
</template>

<script>
	export default {
		name: "Tabs",
		data() {
			return {
				// editableTabsValue: this.$store.state.menus.editableTabsValue,
				// editableTabs: this.$store.state.menus.editableTabs
			}
		},
		computed: {
			editableTabs: {
				get() {
					return this.$store.state.menus.editableTabs
				},
				set(val) {
					this.$store.state.menus.editableTabs = val
				}
			},
			editableTabsValue: {
				get() {
					return this.$store.state.menus.editableTabsValue
				},
				set(val) {
					this.$store.state.menus.editableTabsValue = val
				}
			}
		},
		methods: {
			removeTab(targetName) {
				this.$store.commit("removeTab", targetName)
				console.log("editableTabsValue");
				console.log(this.editableTabsValue);
				this.$router.push({name: this.editableTabsValue})
			},
			clickTab (target) {
				this.$router.push({name: target.name})
			}
		}
	}
</script>

<style scoped>

</style>