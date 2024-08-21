import { Icon, Layout, Text } from "app/components"
import { commonStyles } from "app/theme/commonStyles"
import React, { useState } from "react"
import { ScrollView } from "react-native-gesture-handler"
import { TouchableOpacity, View } from "react-native"
import { colors } from "app/theme"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Home: React.FC<any> = ({ navigation }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [locationText, setLocationText] = useState("San Francisco, CA")
  return (
    <Layout showMenu>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[commonStyles.container, commonStyles.spaceTopMargin]}
      >
        <View style={{ flexDirection: commonStyles.rowList.flexDirection }}>
          <Text
            testID="title_1"
            tx={"dashboard.title_1"}
            size="xxl"
            weight="bold"
            preset="heading"
          />
          <Text
            testID="title_2"
            tx={"dashboard.title_2"}
            size="xxl"
            weight="bold"
            preset="heading"
            style={{
              color: commonStyles.locationText.color,
            }}
          />
        </View>
        <View>
          <Text
            testID="title_3"
            tx={"dashboard.title_3"}
            size="xxl"
            weight="bold"
            preset="heading"
          />
        </View>
        <View style={commonStyles.location}>
          <Icon icon="location" color={commonStyles.locationText.color} size={24} />
          <Text style={commonStyles.locationText} text={locationText} />
        </View>
        <View>
          <TouchableOpacity style={commonStyles.cardButtomHome}>
            <View style={commonStyles.cardView}>
              <View style={commonStyles.cardButtonIcon}>
                <Icon icon="pinMap" color={commonStyles.locationText.color} size={37} />
              </View>

              <Text
                size="xl"
                tx="dashboard.cards.map"
                style={commonStyles.cardButtonText}
                weight="bold"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={commonStyles.cardButtomHome}>
            <View style={commonStyles.cardView}>
              <View
                style={[
                  commonStyles.cardButtonIcon,
                  { backgroundColor: colors.palette.bgColorRed },
                ]}
              >
                <Icon icon="owner" color={colors.palette.primaryRed90} size={37} />
              </View>

              <Text
                size="xl"
                tx="dashboard.cards.searchOwner"
                style={commonStyles.cardButtonText}
                weight="bold"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={commonStyles.cardButtomHome}>
            <View style={commonStyles.cardView}>
              <View
                style={[commonStyles.cardButtonIcon, { backgroundColor: colors.palette.gray20 }]}
              >
                <Icon icon="address" color={colors.palette.gray90} size={37} />
              </View>

              <Text
                size="xl"
                tx="dashboard.cards.searchAddress"
                style={commonStyles.cardButtonText}
                weight="bold"
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Layout>
  )
}

export default Home
