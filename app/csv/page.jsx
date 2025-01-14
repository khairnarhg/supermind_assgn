"use client"
import React, { useState, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UploadCloud, CheckCircle, XCircle, TrendingUp, BarChartIcon, PieChartIcon, CalendarIcon, HashIcon } from 'lucide-react'
import { BarChart, Bar, Brush, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis } from "recharts"
import FooterIllustration from "@/public/images/footer-illustration.svg";
import Image from "next/image";
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']
function EnhancedCSVAnalyzer() {
    const [file, setFile] = useState(null)
    const [data, setData] = useState([])
    const [showAllRows, setShowAllRows] = useState(false)
    const [rowsToShow, setRowsToShow] = useState(5)
    const [uploadStatus, setUploadStatus] = useState("idle")
    const fileInputRef = useRef(null)
    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setFile(event.target.files[0]);
            setUploadStatus("success");  // Show success immediately after file upload
        }
    };
    
    const handleUpload = () => {
        if (file) {
            setUploadStatus("analyzing"); // Show analyzing message during upload
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                const rows = text.split("\n");
                const parsedData = rows.slice(1).map(row => {
                    const [date, type, likes, comments, shares] = row.split(",");
                    return {
                        date: new Date(date),
                        type,
                        likes: parseInt(likes),
                        comments: parseInt(comments),
                        shares: parseInt(shares)
                    };
                });
                setData(parsedData);
                setUploadStatus("success");
            };
            reader.onerror = () => {
                setUploadStatus("error");
            };
            reader.readAsText(file);
            setFile(null);
        }
    };
    
    const handleShowMore = () => {
        setRowsToShow(data.length)
        setShowAllRows(true)
    }
    const handleShowLess = () => {
        setRowsToShow(5)
        setShowAllRows(false)
    }
    const resetUpload = () => {
        setUploadStatus("idle")
        setFile(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }
    const handleDownloadSampleCSV = () => {
        try {
          const filePath = 'csv/project1.csv';
          
          
          const link = document.createElement('a');
          link.href = filePath; 
          link.download = 'sample.csv'; 
          
          
          link.click();
        } catch (e) {
          console.log('Error in downloading CSV:', e);
        }
      };
      
    const memoizedAnalytics = useMemo(() => {
        if (data.length === 0) return null;

       


        const validData = data.filter(row =>
            typeof row.likes === 'number' &&
            typeof row.comments === 'number' &&
            typeof row.shares === 'number' &&
            !isNaN(new Date(row.date).getTime())
        );

        if (validData.length === 0) return null; // If no valid data, return null

        const totalLikes = validData.reduce((acc, row) => acc + row.likes, 0);
        const totalComments = validData.reduce((acc, row) => acc + row.comments, 0);
        const totalShares = validData.reduce((acc, row) => acc + row.shares, 0);

        const avgLikes = (totalLikes / validData.length).toFixed(2);
        const avgComments = (totalComments / validData.length).toFixed(2);
        const avgShares = (totalShares / validData.length).toFixed(2);

        const maxLikes = Math.max(...validData.map(row => row.likes));
        const minLikes = Math.min(...validData.map(row => row.likes));

        const dateRange = {
            earliestDate: new Date(Math.min(...validData.map(row => new Date(row.date).getTime()))).toLocaleDateString(),
            latestDate: new Date(Math.max(...validData.map(row => new Date(row.date).getTime()))).toLocaleDateString()
        };

        const postTypeCount = validData.reduce((acc, row) => {
            acc[row.type] = (acc[row.type] || 0) + 1;
            return acc;
        }, {});

        const postTypeChartData = Object.keys(postTypeCount).map(type => ({
            type,
            count: postTypeCount[type]
        }));

        const topPosts = [...validData]
            .sort((a, b) => b.likes - a.likes)
            .slice(0, 5);

        const engagementOverTime = validData.map(row => ({
            date: new Date(row.date).toISOString().split('T')[0],  // Formats to YYYY-MM-DD
            likes: row.likes,
            comments: row.comments,
            shares: row.shares
        }));


        const engagementDistribution = [
            { name: 'Likes', value: totalLikes },
            { name: 'Comments', value: totalComments },
            { name: 'Shares', value: totalShares }
        ];
        // New analytics features
        const trendAnalysis = data.map(row => ({
            date: row.date.toLocaleDateString(),
            engagement: row.likes + row.comments + row.shares
        }))
        const engagementRateData = data.map(row => ({
            date: row.date.toLocaleDateString(),
            engagementRate: ((row.likes + row.comments + row.shares) / (totalLikes + totalComments + totalShares) * 100).toFixed(2)
        }))
        const dayOfWeekAnalysis = data.reduce((acc, row) => {
            const dayOfWeek = row.date.toLocaleDateString('en-US', { weekday: 'long' })
            if (!acc[dayOfWeek]) {
                acc[dayOfWeek] = { posts: 0, likes: 0, comments: 0, shares: 0 }
            }
            acc[dayOfWeek].posts++
            acc[dayOfWeek].likes += row.likes
            acc[dayOfWeek].comments += row.comments
            acc[dayOfWeek].shares += row.shares
            return acc
        }, {})
        const dayOfWeekChartData = Object.entries(dayOfWeekAnalysis).map(([day, stats]) => ({
            day,
            avgLikes: (stats.likes / stats.posts).toFixed(2),
            avgComments: (stats.comments / stats.posts).toFixed(2),
            avgShares: (stats.shares / stats.posts).toFixed(2)
        }))
        const wordCloudData = Object.entries(postTypeCount).map(([type, count]) => ({
            value: type,
            count: count
        }))
        const correlationData = data.map(row => ({
            likes: row.likes,
            comments: row.comments,
            shares: row.shares
        }))
        return {
            totalLikes,
            totalComments,
            totalShares,
            avgLikes,
            avgComments,
            avgShares,
            maxLikes,
            minLikes,
            dateRange,
            postTypeChartData,
            topPosts,
            engagementOverTime,
            engagementDistribution,
            trendAnalysis,
            engagementRateData,
            dayOfWeekChartData,
            wordCloudData,
            correlationData
        }
    }, [data]) // Add data as a dependency
    const MotionCard = motion(Card)
    return (
        <div className="min-h-screen p-6 space-y-6 bg-#030712 ">
            <div>
                <div className='flex items-center justify-center p-5'>

                    <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl self-center">
                    Enhanced CSV Analyzer
                    </h2>

                </div>
                <Button style={{color: 'white', backgroundColor: 'green', position: 'absolute', right: '3vw', transform: 'translateY(-10vh)'}} onClick={handleDownloadSampleCSV}>
                    Download Sample CSV
                </Button>
                <Card className="w-full pt-5 shadow-lg">
                    
                    <CardContent>
                        <div className="space-y-4">
                        <AnimatePresence mode="wait">
    {uploadStatus === "idle" && (
        <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-16 h-16 mb-4 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">CSV file (MAX. 10MB)</p>
                </div>
                <Input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".csv"
                    ref={fileInputRef}
                />
            </label>
        </motion.div>
    )}

    {uploadStatus === "success" && (
        <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center justify-center h-64 rounded-lg bg-green-50"
        >
            <CheckCircle className="w-16 h-16 mb-4 text-green-500" />
            <p className="text-lg font-semibold text-green-700">File uploaded successfully!</p>
            <div className="flex gap-4 mt-4">
                {/* Upload Another File Button */}
                <Button
                    onClick={resetUpload}
                    className="text-white bg-gray-500 hover:bg-gray-600"
                >
                    Upload Another File
                </Button>
                {/* Analyze Button */}
                <Button
                    onClick={handleUpload}
                    className="text-white bg-indigo-500 hover:bg-indigo-700"
                >
                    Analyze
                </Button>
            </div>
        </motion.div>
    )}

    {uploadStatus === "analyzing" && (
        <motion.div
            key="analyzing"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center justify-center h-64 rounded-lg bg-blue-50"
        >
            <BarChartIcon className="w-16 h-16 mb-4 text-blue-500 animate-pulse" />
            <p className="text-lg font-semibold text-blue-700">Analyzing data...</p>
        </motion.div>
    )}

    {uploadStatus === "error" && (
        <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center justify-center h-64 rounded-lg bg-red-50"
        >
            <XCircle className="w-16 h-16 mb-4 text-red-500" />
            <p className="text-lg font-semibold text-red-700">Error uploading file</p>
            <Button onClick={resetUpload} className="mt-4 text-white bg-red-500 hover:bg-red-600">
                Try Again
            </Button>
        </motion.div>
    )}
</AnimatePresence>


                        </div>
                    </CardContent>
                </Card>
            </div>
            {memoizedAnalytics && (
                <div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <MotionCard
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium">Summary Statistics</CardTitle>
                                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <dl className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <dt className="font-medium">Total Likes</dt>
                                        <dd className="text-2xl font-bold">{memoizedAnalytics.totalLikes}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-medium">Total Comments</dt>
                                        <dd className="text-2xl font-bold">{memoizedAnalytics.totalComments}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-medium">Total Shares</dt>
                                        <dd className="text-2xl font-bold">{memoizedAnalytics.totalShares}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-medium">Avg. Likes</dt>
                                        <dd className="text-2xl font-bold">{memoizedAnalytics.avgLikes}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-medium">Max Likes</dt>
                                        <dd className="text-2xl font-bold">{memoizedAnalytics.maxLikes}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-medium">Min Likes</dt>
                                        <dd className="text-2xl font-bold">{memoizedAnalytics.minLikes}</dd>
                                    </div>
                                </dl>
                            </CardContent>
                        </MotionCard>
                        <MotionCard
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium">Top 5 Posts by Likes</CardTitle>
                                <BarChartIcon className="w-4 h-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {memoizedAnalytics.topPosts.map((post, index) => (
                                        <li key={index} className="text-sm">
                                            <span className="font-medium">{post.date.toLocaleDateString()}</span>: {post.likes} likes, {post.comments} comments, {post.shares} shares
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </MotionCard>
                    </div>
                    <MotionCard
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-6"
                    >
                        <CardHeader>
                            <CardTitle className="text-xl font-bold">Engagement Over Time</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={memoizedAnalytics.engagementOverTime}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="date"
                                            interval={memoizedAnalytics.engagementOverTime.length > 20 ? 'preserveStartEnd' : 'preserveStartEnd'} // Reduce labels if too many
                                        />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="likes" stroke="#8884d8" />
                                        <Line type="monotone" dataKey="comments" stroke="#82ca9d" />
                                        <Line type="monotone" dataKey="shares" stroke="#ffc658" />
                                        {/* Brush to allow user to drag and zoom */}
                                        <Brush
                                            dataKey="date"
                                            height={30}
                                            stroke="#8884d8"
                                            travellerWidth={10}
                                            startIndex={memoizedAnalytics.engagementOverTime.length - 30} // Adjust to control initial viewable area
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </MotionCard>
                    <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
                        <MotionCard
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <CardHeader>
                                <CardTitle className="text-xl font-bold">Post Type Distribution</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={memoizedAnalytics.postTypeChartData}
                                                dataKey="count"
                                                nameKey="type"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                fill="#8884d8"
                                                label
                                            >
                                                {memoizedAnalytics.postTypeChartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </MotionCard>
                        <MotionCard
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            <CardHeader>
                                <CardTitle className="text-xl font-bold">Engagement Distribution</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={memoizedAnalytics.engagementDistribution}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                fill="#8884d8"
                                                label
                                            >
                                                {memoizedAnalytics.engagementDistribution.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </MotionCard>
                    </div>
                    <MotionCard
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="mt-6"
                    >
                        <CardHeader>
                            <CardTitle className="text-xl font-bold">Trend Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={memoizedAnalytics.trendAnalysis}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" interval={memoizedAnalytics.trendAnalysis.length > 20 ? 'preserveStartEnd' : 'preserveStartEnd'} /> {/* Reduce number of X-axis labels */}
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="engagement" stroke="#8884d8" />
                                        {/* Brush to allow user to drag and zoom */}
                                        <Brush
                                            dataKey="date"
                                            height={30}
                                            stroke="#8884d8"
                                            travellerWidth={10}
                                            startIndex={memoizedAnalytics.trendAnalysis.length - 30} // Adjust to control initial viewable area
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </MotionCard>
                    <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
                        <MotionCard
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                        >
                            <CardHeader>
                                <CardTitle className="text-xl font-bold">Engagement Rate</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={memoizedAnalytics.engagementRateData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis
                                                dataKey="date"
                                                interval={memoizedAnalytics.engagementRateData.length > 20 ? 'preserveStartEnd' : 'preserveStartEnd'} // Reduce number of labels if too many
                                            />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="engagementRate" stroke="#82ca9d" />
                                            {/* Brush to allow user to drag and zoom */}
                                            <Brush
                                                dataKey="date"
                                                height={30}
                                                stroke="#82ca9d"
                                                travellerWidth={10}
                                                startIndex={memoizedAnalytics.engagementRateData.length - 30} // Adjust to control initial viewable area
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </MotionCard>
                        <MotionCard
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 1.0 }}
                        >
                            <CardHeader>
                                <CardTitle className="text-xl font-bold">Day of Week Analysis</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={memoizedAnalytics.dayOfWeekChartData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="day" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="avgLikes" fill="#8884d8" />
                                            <Bar dataKey="avgComments" fill="#82ca9d" />
                                            <Bar dataKey="avgShares" fill="#ffc658" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </MotionCard>
                    </div>
                    <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
                        {/* <MotionCard
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 1.1 }}
                        >
                            <CardHeader>
                                <CardTitle className="text-xl font-bold">Word Cloud</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] flex items-center justify-center">
                                    <TagCloud
                                        minSize={12}
                                        maxSize={35}
                                        tags={memoizedAnalytics.wordCloudData}
                                        onClick={tag => console.log('clicking on tag:', tag)}
                                    />
                                </div>
                            </CardContent>
                        </MotionCard> */}
                        <MotionCard
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 1.2 }}
                        >
                            <CardHeader>
                                <CardTitle className="text-xl font-bold">Correlation Analysis</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <ScatterChart>
                                            <CartesianGrid />
                                            <XAxis type="number" dataKey="likes" name="likes" />
                                            <YAxis type="number" dataKey="comments" name="comments" />
                                            <ZAxis type="number" dataKey="shares" name="shares" range={[0, 1000]} />
                                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                            <Legend />
                                            <Scatter name="Correlation" data={memoizedAnalytics.correlationData} fill="#8884d8" />
                                        </ScatterChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </MotionCard>
                    </div>
                    <MotionCard
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.3 }}
                        className="mt-6"
                    >
                        <CardHeader>
                            <CardTitle className="text-xl font-bold">CSV Data</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Likes</TableHead>
                                            <TableHead>Comments</TableHead>
                                            <TableHead>Shares</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {data.slice(0, rowsToShow).map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{row.date.toLocaleDateString()}</TableCell>
                                                <TableCell>{row.type}</TableCell>
                                                <TableCell>{row.likes}</TableCell>
                                                <TableCell>{row.comments}</TableCell>
                                                <TableCell>{row.shares}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="flex justify-center mt-4">
                                {!showAllRows ? (
                                    <Button onClick={handleShowMore} className="text-white bg-blue-600 hover:bg-blue-700">
                                        Show More
                                    </Button>
                                ) : (
                                    <Button onClick={handleShowLess} className="text-white bg-blue-600 hover:bg-blue-700">
                                        Show Less
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </MotionCard>
                </div>
            )}
            <div
                className="absolute bottom-0 -translate-x-1/2 pointer-events-none left-1/2 -z-10"
                aria-hidden="true"
            >
                <Image
                    className="max-w-none"
                    src={FooterIllustration}
                    width={1076}
                    height={378}
                    alt="Footer illustration"
                />
            </div>
        </div>
    )
}
export default React.memo(EnhancedCSVAnalyzer)