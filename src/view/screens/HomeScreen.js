import { Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../conts/Colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Searchbar } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Octicons from 'react-native-vector-icons/Octicons'

const filterProjectTypes = [
    {
        id: 1,
        name: 'In Progress'
    },
    {
        id: 2,
        name: 'Pending'
    },
    {
        id: 3,
        name: 'Completed'
    },
    {
        id: 4,
        name: 'Cancled'
    },
]

const tempProjects = [
    {
        id: 1,
        title: 'Job Portal Webiste App',
        detail: 'asaijdas asodisa asidsad sadsa',
        startDate: '12/5/2024',
        timeperiod: '30',
    },
    {
        id: 2,
        title: 'Game Development',
        detail: 'asaijdas asodisa asidsad sadsa',
        startDate: '02/5/2024',
        timeperiod: '30',
    },
    {
        id: 3,
        title: 'Tiki Mobile App',
        detail: 'asaijdas asodisa asidsad sadsa',
        startDate: '16/5/2024',
        timeperiod: '60',
    },
    {
        id: 4,
        title: 'Tiki Mobile App',
        detail: 'asaijdas asodisa asidsad sadsa',
        startDate: '16/5/2024',
        timeperiod: '60',
    },
]

const HomeScreen = ({ navigation }) => {
    const [search, setSearch] = useState({
        enable: false,
        value: null
    })
    const [projectType, setProjectType] = useState(null)

    const calculateDaysLeft = (startDateStr) => {
        // Parse the date string in the format 'DD/MM/YYYY'
        const [day, month, year] = startDateStr.split('/').map(Number);
        const startDate = new Date(year, month - 1, day); // month is zero-based

        // Get the current date
        const currentDate = new Date();

        // Calculate the difference in time
        const timeDifference = currentDate - startDate;

        // Convert the time difference from milliseconds to days
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        return daysDifference;
    };

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.white,
        }}>
            <View style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 20
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Image source={require('../../assets/logo-disk.png')} resizeMode='contain' style={{
                        width: 50,
                        height: 50,
                    }} />
                    <Text style={[styles?.fonts, {
                        fontSize: 16,
                        paddingLeft: 10
                    }]}>
                        My Projects
                    </Text>
                </View>

                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={{
                        paddingRight: 10
                    }}>
                        <AntDesign name='bells' color={COLORS.gray} size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSearch({ ...search, enable: !search?.enable })} style={{
                        paddingRight: 10
                    }}>
                        <AntDesign name='search1' color={search?.enable ? COLORS.main : COLORS.gray} size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AllInvoices')} style={{
                        paddingRight: 10
                    }}>
                        <Ionicons name='receipt-outline' size={20} color={COLORS.gray} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                        <AntDesign name='user' color={COLORS.gray} size={20} />
                    </TouchableOpacity>
                </View>

            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {search?.enable &&
                    <View style={{
                        paddingHorizontal: 20
                    }}>
                        <Searchbar
                            placeholder="Search"
                            onChangeText={(text) => setSearch({ ...search, value: text })}
                            style={{
                                borderRadius: 10,
                                borderWidth: 0,
                                borderColor: COLORS.main,
                                backgroundColor: COLORS.light,
                                elevation: 9,
                                // height: '90%', // Adjust the height as needed
                                paddingVertical: 0, // Remove padding
                                paddingHorizontal: 10, // Adjust horizontal padding as needed
                                fontSize: 12,
                                color: COLORS.black,
                                alignItems: 'center',
                                textAlignVertical: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                // lineHeight:'8%',
                            }}
                            value={search?.value}
                            placeholderTextColor={COLORS.gray}
                        />
                    </View>
                }
                <View style={{
                    flexDirection: 'row',
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {filterProjectTypes?.map((item, i) => (
                            <TouchableOpacity
                                onPress={() => setProjectType(item?.name)}
                                key={i}
                                style={{
                                    paddingHorizontal: 10,
                                    borderWidth: 1,
                                    borderRadius: 50,
                                    paddingVertical: 5,
                                    marginRight: 5.,
                                    backgroundColor: projectType == item?.name ? COLORS.main : COLORS.transparent
                                }}>
                                <Text style={[styles.fonts, {
                                    color: projectType == item?.name ? COLORS.white : COLORS.main,
                                    fontWeight: 'normal',
                                    fontSize: 12
                                }]}>
                                    {item?.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {search?.value &&
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 10,
                        paddingHorizontal: 20
                    }}>
                        <Text style={[styles?.fonts, {
                            color: COLORS.black,
                            fontSize: 12,
                            fontWeight: 'bold'
                        }]}>
                            Search Results
                        </Text>
                        <Text style={[styles?.fonts, {
                            color: COLORS.mainlight,
                            fontSize: 12,
                            fontWeight: 'bold'
                        }]}>
                            23 founds
                        </Text>
                    </View>
                }

                {tempProjects?.map((item, i) => {
                    const leftDays = calculateDaysLeft(item?.startDate);

                    const percentage = (leftDays / item?.timeperiod) * 100;

                    return (
                        <View key={i} style={{
                            backgroundColor: COLORS.white,
                            elevation: 9,
                            borderRadius: 20,
                            paddingVertical: 20,
                            paddingHorizontal: 20,
                            marginHorizontal: 20,
                            marginBottom: 10
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={[styles.fonts, {
                                    color: COLORS.black,
                                    textAlign: 'left',
                                    fontSize: 16
                                }]} numberOfLines={1}>
                                    {item?.title}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ProjectDetail')}
                                    style={{
                                        width: '20%',
                                        // backgroundColor:COLORS.main,
                                        alignItems: 'flex-end'
                                    }}>
                                    <Octicons name='dot' size={8} color={COLORS.gray} />
                                    <Octicons name='dot' size={8} color={COLORS.gray} />
                                    <Octicons name='dot' size={8} color={COLORS.gray} />
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.fonts, {
                                color: COLORS.gray,
                                fontWeight: 'normal',
                                textAlign: 'left',
                                fontSize: 12,
                                paddingVertical: 5
                            }]} numberOfLines={1}>
                                {item?.detail}
                            </Text>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingVertical: 20
                            }}>
                                <View style={{
                                    backgroundColor: percentage <= '30' ? COLORS.green : percentage <= '70' ? COLORS.main : 'red',
                                    paddingHorizontal: 20,
                                    paddingVertical: 5,
                                    borderRadius: 50
                                }}>
                                    <Text style={[styles.fonts, {
                                        color: COLORS.white,
                                        fontWeight: 'normal',
                                        fontSize: 12
                                    }]}>
                                        {item?.timeperiod} / {leftDays > '0' ? leftDays : '0'}
                                    </Text>
                                </View>
                                <Text style={[styles.fonts, {
                                    color: COLORS.gray,
                                    fontWeight: 'normal',
                                    fontSize: 12
                                }]}>
                                    {leftDays > '0' ? (item?.timeperiod - leftDays) : '0'} Days Left
                                </Text>
                            </View>
                            <View style={{
                                height: 5,
                                flexDirection: 'row',
                                width: '100%',
                                backgroundColor: COLORS.gray2, // Light gray background
                                borderRadius: 10,
                                overflow: 'hidden',
                                alignItems: 'center',
                                // justifyContent: 'center',
                            }}>
                                <View style={{
                                    width: `${percentage}%`, height: '100%',
                                    backgroundColor: percentage <= '30' ? COLORS.green : percentage <= '70' ? COLORS.main : 'red',
                                }} />
                            </View>
                        </View>
                    )
                })}

            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    fonts: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular',
        color: COLORS.black
    },
})